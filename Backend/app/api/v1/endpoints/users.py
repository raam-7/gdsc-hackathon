from fastapi import APIRouter, HTTPException, Depends
from app.schemas.user import RegisterSchema, LoginSchema
from app.services.user_service import register_team, authenticate_team
from app.core.security import create_access_token
from app.api.deps import get_current_team
from app.db.session import db

router = APIRouter()

@router.post("/register", status_code=201)
async def register(data: RegisterSchema):
    team_id = await register_team(data)
    return {"message": "Success", "team_id": team_id}

@router.post("/login")
async def login(data: LoginSchema):
    team = await authenticate_team(data.unique_team_id, data.password)
    if not team:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": team["unique_team_id"]})
    return {"access_token": token, "token_type": "bearer"}


@router.get("/team/me")
async def get_my_team(team=Depends(get_current_team)):
    team["_id"] = str(team["_id"])
    team.pop("password_hash")
    return team

@router.get("/team/status")
async def get_team_status(team=Depends(get_current_team)):
    submission = await db.submissions.find_one(
        {"team_id": team["unique_team_id"]}
    )

    return {
        "is_verified": team.get("is_email_verified", False),
        "submission_status": submission["status"] if submission else "Not Submitted"
    }
