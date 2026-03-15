from sqlalchemy.orm import Session
import backend.models.db_models as model
import backend.models.user_schema as user_schema
import backend.core.utils as utils


def get_users(db: Session):
    return db.query(model.User).all()

def get_user(db: Session, user_id: str):
    return (
        db.query(model.User)
        .filter(model.User.id == user_id)
        .first()
    )




def create_user(db: Session, user: user_schema.UserCreate):
    # 1. Hash the incoming plain-text password
    hashed_pw = utils.get_password_hash(user.password)

    # 2. Build the SQLAlchemy model safely
    db_user = model.User(
        email=user.email,
        username=user.username,
        full_name=user.full_name,
        profile_image=user.profile_image,
        login_provider=user.login_provider,

        # We explicitly set defaults for security-sensitive fields here
        role="user",
        is_verified=False,
        is_active=True,

        # Pass the generated hash to the database model
        hashed_password=hashed_pw
    )

    # 3. Save and refresh
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def update_user(db: Session, user: user_schema.UserUpdate, user_id: int):
    db_user = db.query(model.User).filter(model.User.id == user_id).first()
    if db_user:
        db_user.full_name = user.full_name
        db_user.profile_image = user.profile_image
        db_user.is_active = True
        db.commit()
        db.refresh(db_user)
    return db_user

########################################################################################
################################### Auth Endpoints #####################################
########################################################################################




def authenticate_user(db: Session, user):
    db_user = db.query(model.User).filter(model.User.username == user.username).first()
    if db_user:
        if utils.verify_password(user.password, db_user.hashed_password):
            access_token = utils.create_access_token(data={"sub": user.username})
            return {'access_token':access_token, 'token_type':'bearer'}
        return {'access_token':'invalid_pass', 'token_type':'bearer'}
    return {'access_token':'invalid_user', 'token_type':'bearer'}
