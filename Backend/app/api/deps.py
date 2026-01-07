# Auth & DB dependencies
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from app.core.config import settings
from app.db.session import db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/login")

async def get_current_team(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM]
        )
        team_id = payload.get("sub")
        team = await db.teams.find_one({"unique_team_id": team_id})
        if not team:
            raise HTTPException(status_code=401)
        return team
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid Token")
