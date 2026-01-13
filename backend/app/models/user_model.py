from pydantic import BaseModel, EmailStr, Field
from typing import Optional

# 1. Schema for REGISTERING a user (Client -> Server)
class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)

# 2. Schema for LOGGING IN (Client -> Server)
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# 3. Schema for RETURNING data (Server -> Client)
# We NEVER return the password!
class UserResponse(BaseModel):
    id: str
    username: str
    email: EmailStr
    
    class Config:
        # This helps map MongoDB "_id" to "id"
        populate_by_name = True