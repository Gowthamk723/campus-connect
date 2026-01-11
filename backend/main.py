from fastapi import FastAPI

app = FastAPI(title="CampusConnect API")

@app.get("/")
def read_root():
    return {"message": "Welcome to CampusConnect Backend 🚀"}