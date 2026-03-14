from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from backend.api import auth
from backend.core.psql_database import engine, SessionLocal, Base
from typing import List
import backend.models.user_schema as user_schema
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)
app = FastAPI()
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


# Authentication Logic
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


## Endpoints
### 1. Create User
@app.post('/users', response_model=user_schema.UserRead)
def create_user(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    return auth.create_user(db, user)


### 2. Get Users
@app.get('/users', response_model=List[user_schema.UserRead])
def read_users(db: Session = Depends(get_db)):
    return auth.get_users(db)


### 3. Get a User
@app.get('/users/{u_id}', response_model=user_schema.UserRead)
def read_users(u_id: str, db: Session = Depends(get_db)):
    user = auth.get_user(db, u_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


### 4. Update a User
@app.put('/users/{u_id}', response_model=user_schema.UserRead)
def read_users(u_id: int, user: user_schema.UserUpdate, db: Session = Depends(get_db)):
    db_user = auth.update_user(db, user, u_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user