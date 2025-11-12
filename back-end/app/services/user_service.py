from app.db.session import supabase
from werkzeug.security import generate_password_hash, check_password_hash

def create_user(email, password, username=None, full_name=None):
    hashed = generate_password_hash(password)
    user_data = {
        "email": email,
        "password": hashed,
        "username": username,
        "full_name": full_name
    }
    response = supabase.table("users").insert(user_data).execute()
    # response might be an object with .data or .error depending on version
    if not hasattr(response, "data"):
        raise Exception(f"Unexpected response: {response}")
    if not response.data or isinstance(response.data, list) and len(response.data) == 0:
        raise Exception(f"Failed to create user: {response.data}")
    return response.data[0]

def authenticate_user(email, password):
    response = supabase.table("users").select("*").eq("email", email).execute()
    if not hasattr(response, "data"):
        return None
    users = response.data
    if not users:
        return None
    user = users[0]
    if not check_password_hash(user["password"], password): # type: ignore
        return None
    return user

