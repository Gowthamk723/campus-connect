from fastapi import FastAPI
from contextlib import asynccontextmanager
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings
from app.database import db

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup Logic
    try:
        db.client = AsyncIOMotorClient(settings.MONGO_URL)
        # Send a ping to confirm a successful connection
        await db.client.admin.command('ping')
        print("✅ Successfully connected to MongoDB Atlas!")
    except Exception as e:
        print(f"❌ Connection failed: {e}")
    
    yield
    
    # Shutdown Logic
    db.client.close()
    print("🔻 Disconnected from MongoDB")

app = FastAPI(title="CampusConnect API", lifespan=lifespan)

@app.get("/")
def read_root():
    return {"message": "Welcome to CampusConnect Backend 🚀"}