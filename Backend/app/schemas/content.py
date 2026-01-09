from pydantic import BaseModel
from typing import List, Optional

class ProblemStatementSchema(BaseModel):
    ps_id: str
    title: str
    domain: str
    short_description: str
    download_link: str
    difficulty_level: str

class FAQSchema(BaseModel):
    question: str
    answer: str