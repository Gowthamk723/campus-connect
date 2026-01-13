from fastapi import APIRouter, HTTPException, status
from app.database import db
from app.models.user_model import UserCreate, UserLogin, UserResponse
from app.core.security import get_password_hash, verify_password, create_access_token
from bson import ObjectId
from datetime import datetime
from app.core.config import settings

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def register(user: UserCreate):
    # 1. Check if user already exists
    existing_user = await db.client[settings.DB_NAME]["users"].find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # 2. Hash the password
    hashed_password = get_password_hash(user.password)

    # 3. Save to MongoDB
    new_user = {
        "username": user.username,
        "email": user.email,
        "password": hashed_password,
        "role": "user",
        "created_at": datetime.utcnow()
    }
    result = await db.client[settings.DB_NAME]["users"].insert_one(new_user)

    # 4. Return the new user (without password)
    return {
        "id": str(result.inserted_id),
        "username": user.username,
        "email": user.email
    }

@router.post("/login")
async def login(user: UserLogin):
    # 1. Find user by email
    db_user = await db.client[settings.DB_NAME]["users"].find_one({"email": user.email})
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # 2. Verify password
    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # 3. Create Token
    access_token = create_access_token(data={"sub": str(db_user["_id"])})
    
    return {"access_token": access_token, "token_type": "bearer"}