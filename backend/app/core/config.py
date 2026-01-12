import os
from dotenv import load_dotenv

# Load variables from .env file
load_dotenv()

class Settings:
    MONGO_URL = os.getenv("MONGO_URL")
    DB_NAME = os.getenv("DB_NAME", "campus_connect_db")

settings = Settings()



