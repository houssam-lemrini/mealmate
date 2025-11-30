from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from app.services.ai_meal_service import generate_meal_from_ingredients

router = APIRouter(prefix="/api/meals", tags=["meals"])

class IngredientsRequest(BaseModel):
    ingredients: List[str]

@router.post("/generate")
async def generate_meal(request: IngredientsRequest):
    """
    Generate a meal suggestion from a list of ingredients using AI (Google Gemini).
    """
    if not request.ingredients or len(request.ingredients) == 0:
        raise HTTPException(status_code=400, detail="At least one ingredient is required")
    
    if len(request.ingredients) > 20:
        raise HTTPException(status_code=400, detail="Too many ingredients. Maximum 20 allowed.")
    
    try:
        meal = await generate_meal_from_ingredients(request.ingredients)
        return {
            "success": True,
            "meal": meal
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
