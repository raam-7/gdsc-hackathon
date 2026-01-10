# User Pydantic schemas
from pydantic import BaseModel, EmailStr
from typing import List

class MemberSchema(BaseModel):
    full_name: str
    email: EmailStr
    phone_number: str
    college_year: str
    branch: str

class RegisterSchema(BaseModel):
    team_name: str
    password: str
    leader: MemberSchema
    members: List[MemberSchema]

class LoginSchema(BaseModel):
    unique_team_id: str
    password: str
