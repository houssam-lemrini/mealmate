from fastapi import APIRouter, HTTPException
from app.schemas.auth import UserCreate, UserLogin, Token
from app.services.user_service import create_user, authenticate_user

router = APIRouter()

@router.post("/signup")
def signup(data: UserCreate):
    user = create_user(data.user, data.email, data.password)
    return {"msg": "user created", "user_id": user.id} # type: ignore

@router.post("/signin")
def signin(data: UserLogin):
    user = authenticate_user(data.user, data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Wrong credentials")
    return {"access_token": "fake-token", "token_type": "bearer"}

