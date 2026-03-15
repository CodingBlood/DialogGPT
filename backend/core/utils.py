from datetime import datetime, timedelta, timezone
from authlib.jose import jwt, JoseError
from fastapi import HTTPException
from backend.core.config import settings
from passlib.context import CryptContext


# Setup the hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)



# Setup the JWT Token
SECRET_KEY=settings.SECRET_KEY
ALGORITHM=settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES=settings.ACCESS_TOKEN_EXPIRE_MINUTES
def create_access_token(data: dict):
    header = {'alg': ALGORITHM}
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = data.copy()
    payload.update({'exp': expire})
    return jwt.encode(header, payload, SECRET_KEY).decode('utf-8')

def verify_access_token(token: str):
    try:
        claims = jwt.decode(token, SECRET_KEY)
        claims.validate()
        username = claims.get('sub')
        if username is None:
            raise HTTPException(status_code=401, detail="Token Missing")
        return username
    except JoseError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")

