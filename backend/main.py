import os
import time
from fastapi import FastAPI, HTTPException, Depends, Request, status
from sqlalchemy.orm import Session
from backend.api import auth
from backend.core.psql_database import engine, SessionLocal, Base
from typing import List
import backend.models.user_schema as user_schema
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.gzip import GZipMiddleware
from starlette.middleware.httpsredirect import HTTPSRedirectMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from loguru import logger
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import backend.core.utils as utils
########################################################################################
##############################LOGGING SETUP ############################################
########################################################################################
# 1. Define the log directory
LOG_DIR = "logs"
os.makedirs(LOG_DIR, exist_ok=True)

# 2. Add the "All-In-One" log file (INFO and above)
# Rotation: 10MB file limit | Retention: Keep for 1 week
logger.add(
    os.path.join(LOG_DIR, "app.log"),
    level="INFO",
    rotation="10 MB",
    retention="240 month",
    compression="zip"
)

# 3. Add the "Errors Only" log file (ERROR and above)
logger.add(
    os.path.join(LOG_DIR, "error.log"),
    level="ERROR",
    rotation="5 MB",
    retention="240 month",
    backtrace=True,  # Shows the full variable stack trace
    diagnose=True    # Shows values of variables in the trace
)


########################################################################################
############################## ####Database ############################################
########################################################################################
Base.metadata.create_all(bind=engine)

# Authentication Logic
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
########################################################################################
############################## Fast API SetUP ##########################################
########################################################################################
app = FastAPI()

########################################################################################
############################## Defining Middlewares ####################################
########################################################################################
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
# CORS Middleware (Checks incoming req)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# GZIP Middleware (compresses outgoing res)
app.add_middleware(
    GZipMiddleware,
    minimum_size=1000
)
# HTTP redirect Middleware (converts http req to https req) [Not needed If I am using Ngnix or doing local dev]
# app.add_middleware(HTTPSRedirectMiddleware)

# Custom Timer Middleware
class TimerMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        response = await call_next(request)
        duration = time.time() - start_time
        logger.info(f"Path: {request.url.path} | Duration: {duration:.5f}s | Status: {response.status_code}")
        return response


app.add_middleware(TimerMiddleware)

########################################################################################
################################### Defining Routes ####################################
########################################################################################

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}




########################################################################################
################################### Auth Endpoints# ####################################
########################################################################################
### 1. Create User
@app.post('/DialogGPT/users', response_model=user_schema.UserRead)
def create_user(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    return auth.create_user(db, user)


### 2. Get Users
@app.get('/DialogGPT/users', response_model=List[user_schema.UserRead])
def read_users(db: Session = Depends(get_db)):
    return auth.get_users(db)


### 3. Get a User
@app.get('/DialogGPT/users/{u_id}', response_model=user_schema.UserRead)
def read_users(u_id: str, db: Session = Depends(get_db)):
    user = auth.get_user(db, u_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


### 4. Update a User
@app.put('/DialogGPT/users/{u_id}', response_model=user_schema.UserRead)
def read_users(u_id: int, user: user_schema.UserUpdate, db: Session = Depends(get_db)):
    db_user = auth.update_user(db, user, u_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

### 5. Login

#### set up the token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="DialogGPT/login")
@app.post('/DialogGPT/login')
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    res = auth.authenticate_user(db, form_data)
    if res['access_token'] == 'invalid_pass':
        raise HTTPException(status_code=401, detail="Incorrect password")
    if res['access_token'] == 'invalid_user':
        raise HTTPException(status_code=401, detail="Incorrect username")
    return res


def decode_token(token: str):
    username = utils.verify_access_token(token)
    return username


def get_current_user(token:str = Depends(oauth2_scheme)):
    return decode_token(token)

@app.get('/DialogGPT/chat')
def chat(user = Depends(get_current_user)):
    return user