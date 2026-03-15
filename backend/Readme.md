
Think in layers:

> API → Services → Models → Core (Infra)

---

# 📂 `api/` → Route Layer (Handles HTTP)

This layer **talks to the outside world**.

### 🔹 `chat.py`

* `/chat` endpoint
* Accept user message
* Call `chat_service`
* Return response

Put:

* FastAPI routers
* Request handling
* Response models
* No heavy logic

---

### 🔹 `auth.py`

* Login / Register endpoints
* JWT token creation
* Password verification

Put:

* `/login`
* `/register`
* `/refresh-token`

---

### 🔹 `health.py`

* Health check endpoint

Example:

```python
@router.get("/health")
def health():
    return {"status": "ok"}
```

Used by:

* Docker
* Kubernetes
* Monitoring systems

---

# 📂 `services/` → Business Logic Layer (Brain)

This is where real logic lives.

---

### 🔹 `chat_service.py`

* Orchestrates chat flow
* Calls model
* Stores conversation
* Handles memory window

Example:

```python
def generate_reply(message):
    reply = model_service.generate(message)
    cache_service.store(message, reply)
    return reply
```

---

### 🔹 `model_services.py`

* Load PyTorch model
* Run inference
* Tokenize input
* Generate text

Later:

* Switch from LSTM → Transformer here only

---

### 🔹 `cache_services.py`

* Redis connection
* Get/set cache
* Rate limiting logic

---

# 📂 `models/` → Data Schemas & ORM

Two types live here:

### 1️⃣ Pydantic Schemas (API validation)

### 2️⃣ SQLAlchemy ORM models (DB tables)

---

### 🔹 `chat_schema.py`

* ChatRequest
* ChatResponse

Used by API layer.

---

### 🔹 `user_schema.py`

* LoginRequest
* RegisterRequest
* TokenResponse

---

### 🔹 `db_models.py`

* SQLAlchemy table definitions

Example:

```python
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
```

---

# 📂 `core/` → Infrastructure & Config

This controls how your app runs.

---

### 🔹 `config.py`

* Environment variables
* Settings
* App configuration

Example:

```python
DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
```

---

### 🔹 `database.py`

* SQLAlchemy engine
* Session creation
* DB connection

Example:

```python
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
```

---

### 🔹 `logging.py`

* Configure Python logging
* File + console logs
* Log format

---

### 🔹 `security.py`

* Password hashing (bcrypt)
* JWT creation
* Token validation

---

# 📄 `main.py` → Entry Point

* Create FastAPI app
* Include routers
* Middleware
* Startup events
* CORS

This is what Uvicorn runs.

---

# 📄 `requirements.txt`

List dependencies:

* fastapi
* uvicorn
* sqlalchemy
* redis
* passlib
* python-jose
* torch
* etc.

---

# 📄 `Dockerfile`

Defines container build steps.

Used for:

* Local Docker
* Cloud deployment
* Kubernetes

---

# 📄 `Readme.md`

Explain:

* Project overview
* How to run
* Architecture
* Future roadmap

---

# 📄 `test_main.http`

Used by:

* VSCode REST client
* Manual API testing

Example:

```http
POST http://localhost:8000/chat
Content-Type: application/json

{
  "message": "Hello"
}
```

---

# 📂 `__pycache__/`

Ignore it.

Add to `.gitignore`:

```
__pycache__/
*.pyc
```

---

# 🧠 Clean Architecture Mental Model

| Layer    | Responsibility      |
| -------- | ------------------- |
| api      | HTTP layer          |
| services | Business logic      |
| models   | Data contracts & DB |
| core     | Infrastructure      |
| main     | App startup         |

---

# 🔥 What This Structure Enables

* Easy ML model swap
* Add Kafka without touching API
* Add Redis without breaking logic
* Easy testing
* Clean CI/CD
* Kubernetes ready
