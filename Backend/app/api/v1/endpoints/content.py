from fastapi import APIRouter
from typing import List
from app.schemas.content import ProblemStatementSchema, FAQSchema

router = APIRouter()

@router.get("/problems", response_model=List[ProblemStatementSchema])
async def get_problems():
    # Once Sanidhya sets up 'db', this will fetch from MongoDB 
    return [] 

@router.get("/faqs", response_model=List[FAQSchema])
async def get_faqs():
    return []