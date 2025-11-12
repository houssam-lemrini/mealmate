# app/api/routes_auth.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.user_service import create_user, authenticate_user

router = APIRouter()

class SignUpSchema(BaseModel):
    username: str
    email: str
    password: str
    confirm: str

class SignInSchema(BaseModel):
    username: str
    password: str

@router.post("/signup")
def signup(data: SignUpSchema):
    if data.password != data.confirm:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    try:
        user = create_user(
            email=data.email,
            password=data.password,
            username=data.username
        )
        return {"success": True, "user": {"id": user["id"], "email": user["email"], "username": user["username"]}}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/signin")
def signin(data: SignInSchema):
    user = authenticate_user(email=data.username, password=data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"success": True, "user": {"id": user["id"], "email": user["email"], "username": user["username"]}}
