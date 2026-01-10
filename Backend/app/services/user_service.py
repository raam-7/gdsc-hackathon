# Business logic
import uuid
from app.db.session import db
from app.core.security import get_password_hash, verify_password

teams = db.teams

def generate_team_id():
    return "2F2H-" + uuid.uuid4().hex[:5].upper()

async def register_team(data):
    team_id = generate_team_id()

    team = {
        "team_name": data.team_name,
        "unique_team_id": team_id,
        "password_hash": get_password_hash(data.password),
        "leader": data.leader.dict(),
        "members": [m.dict() for m in data.members],
        "is_email_verified": False,
        "is_disqualified": False
    }

    await teams.insert_one(team)
    return team_id

async def authenticate_team(team_id: str, password: str):
    team = await teams.find_one({"unique_team_id": team_id})
    if not team:
        return None

    if not verify_password(password, team["password_hash"]):
        return None

    return team
