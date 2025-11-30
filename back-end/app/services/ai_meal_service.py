import os
import json
from typing import List, Dict
try:
    import google.generativeai as genai  # type: ignore
except Exception:
    genai = None

# Configure from environment (don't keep secrets in source)
if genai is not None:
    # Call configure via getattr to avoid static-analysis errors when the SDK
    # stubs don't explicitly export `configure` in type checkers.
    configure_fn = getattr(genai, 'configure', None)
    if callable(configure_fn):
        try:
            configure_fn(api_key=os.getenv("GEMINI_API_KEY"))
        except Exception:
            # we'll handle missing key/runtime errors later when calling the SDK
            pass

async def generate_meal_from_ingredients(ingredients: List[str]) -> Dict:
    """
    Generate a meal suggestion using Google Gemini API (FREE)
    Returns: {name, description, instructions, image_url, estimated_nutrition}
    """
    ingredients_str = ", ".join(ingredients)
    api_key = os.getenv("GEMINI_API_KEY")
    
    if not api_key:
        raise Exception("GEMINI_API_KEY not set in environment variables. Get one from https://aistudio.google.com/apikey")
    
    # If the Google SDK isn't available, use a simple local generator
    async def generate_meal_locally(ings: List[str]) -> Dict:
        name = "Salade rapide aux ingrédients"
        desc = f"Une préparation simple et savoureuse à base de {', '.join(ings[:3])}."
        instructions = [
            "Préparer et couper les ingrédients.",
            "Mélanger dans un grand bol.",
            "Assaisonner selon le goût.",
            "Servir immédiatement."
        ]
        estimated_nutrition = {"kcal": 450, "protein": 20, "carbs": 40, "fat": 20}
        return {
            "name": name,
            "description": desc,
            "instructions": instructions,
            "estimated_nutrition": estimated_nutrition,
            "image_url": await get_meal_image(name)
        }

    if genai is None:
        return await generate_meal_locally(ingredients)

    prompt = f"""You are a professional chef and nutritionist. Given these ingredients: {ingredients_str}

Please suggest a delicious and healthy meal that can be made with these ingredients. Provide your response as a JSON object with these exact keys:
- name: string (creative and appetizing dish name)
- description: string (2-3 sentences describing the dish)
- instructions: array of strings (numbered cooking steps, 5-8 steps, be detailed)
- estimated_nutrition: object with keys: kcal (number), protein (number in grams), carbs (number in grams), fat (number in grams)

respond with french language
Be creative, practical, and ensure the meal is realistic and achievable. Return ONLY valid JSON, no markdown formatting, no code blocks."""

    # Build a prioritized list of models to try.
    # Prefer modern Gemini/Pro models that are commonly available for new API keys.
    # This list can be adjusted after running `list_models()` in your environment.
    preferred = [
        "models/gemini-pro-latest",
        "models/gemini-2.5-pro",
        "models/gemini-2.5-flash",
        "models/gemini-2.0-flash"
    ]

    # Try to list available models (gracefully handle SDK differences)
    try:
        raw_models = list(getattr(genai, 'list_models', lambda: [])() or [])
        available_models = []
        for m in raw_models:
            if hasattr(m, 'name'):
                available_models.append(m.name)
            elif isinstance(m, dict) and 'name' in m:
                available_models.append(m['name'])
            elif isinstance(m, str):
                available_models.append(m)
        available_models = list(dict.fromkeys(available_models))
    except Exception as e:
        print(f"Warning: list_models failed: {e}")
        available_models = []

    # Merge preferred + available (avoid duplicates)
    models_to_try = []
    for m in preferred + available_models:
        if m not in models_to_try:
            models_to_try.append(m)

    attempted = []
    last_error = None

    for model_name in models_to_try:
        try:
            ModelCls = getattr(genai, 'GenerativeModel', None)
            if ModelCls is None:
                raise Exception('GenerativeModel class not available in google.generativeai SDK')
            model = ModelCls(model_name)

            generate_fn = getattr(model, 'generate_content', None)
            if not callable(generate_fn):
                raise Exception('generate_content not available on model object')

            # Build generation_config if supported by the SDK
            # Build generation_config if supported by the SDK (use getattr to avoid static analysis errors)
            gen_config = None
            types_mod = getattr(genai, 'types', None)
            gen_config_cls = getattr(types_mod, 'GenerationConfig', None) if types_mod is not None else None
            if gen_config_cls is not None:
                try:
                    gen_config = gen_config_cls(temperature=0.7, response_mime_type="application/json")
                except Exception:
                    gen_config = None

            if gen_config is not None:
                response = generate_fn(prompt, generation_config=gen_config)
            else:
                # Fallback: call without generation_config
                response = generate_fn(prompt)

            # Extract text safely
            text_content = getattr(response, 'text', None)
            if text_content is None:
                # try alternative attribute
                text_content = str(response)
            else:
                text_content = text_content.strip()

            # Parse JSON
            try:
                meal_data = json.loads(text_content)
            except Exception as e:
                raise Exception(f"Failed to parse JSON from model {model_name}: {e}. Response: {text_content[:300]}")

            # Validate required fields
            required_fields = ["name", "description", "instructions", "estimated_nutrition"]
            for field in required_fields:
                if field not in meal_data:
                    raise Exception(f"Missing required field: {field}")

            # Get meal image
            image_url = await get_meal_image(meal_data["name"])
            meal_data["image_url"] = image_url

            return meal_data

        except Exception as e:
            err = str(e)
            last_error = f"model={model_name} error={err}"
            attempted.append((model_name, err))
            print(f"Attempt failed: {model_name} -> {err}")
            continue

    # All model attempts failed — raise a helpful error including attempts
    raise Exception(f"All model attempts failed. Attempted: {attempted}. Last error: {last_error}")

async def get_meal_image(meal_name: str) -> str:
    """
    Get meal image - tries to find food images matching the meal
    """
    import httpx
    
    # Extract first ingredient or food word from meal name
    words = meal_name.lower().split()
    food_words = ['chicken', 'poulet', 'rice', 'riz', 'egg', 'oeuf', 'salad', 'salade', 
                  'pasta', 'pates', 'fish', 'poisson', 'beef', 'boeuf', 'vegetable', 'legume']
    
    search_term = "food"
    for word in words:
        if word in food_words or len(word) > 4:
            search_term = word
            break
    
    # Try TheMealDB first (best quality food images)
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://www.themealdb.com/api/json/v1/1/random.php",
                timeout=5.0
            )
            if response.status_code == 200:
                data = response.json()
                if data.get("meals") and len(data["meals"]) > 0:
                    return data["meals"][0].get("strMealThumb", "")
    except:
        pass
    
    # Fallback: Use a high-quality food image placeholder
    # This is a real food photo from Unsplash
    return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop&auto=format"