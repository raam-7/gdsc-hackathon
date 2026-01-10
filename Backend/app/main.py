# FastAPI app entry point
from fastapi import FastAPI
from app.api.v1.router import api_router

app = FastAPI(title="2Fast2Hack API")

# This connects your content endpoints to the app
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "Server is running! Go to /docs for Swagger UI"}