from fastapi import Depends
from sqlalchemy.orm import Session
from websockets.sync import router

from backend.core.database import get_db
from backend.models.db_models import User


@router.get("/users")
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()