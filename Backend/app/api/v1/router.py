# API router
from fastapi import APIRouter
from app.api.v1.endpoints import content
from app.api.v1.endpoints import users

api_router = APIRouter()
api_router.include_router(content.router, prefix="/content", tags=["content"])
api_router.include_router(users.router, tags=["Users"])