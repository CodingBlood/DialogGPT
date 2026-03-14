import os
from pydantic_settings import BaseSettings, SettingsConfigDict

# Get the directory where config.py lives, then go up one level to the root
dot_env_path = os.path.join(os.path.dirname(__file__), "..", ".env")

class Settings(BaseSettings):
    DATABASE_URL: str

    model_config = SettingsConfigDict(
        env_file=dot_env_path,
        env_file_encoding="utf-8",
        extra="ignore" # Prevents errors if .env has extra variables
    )

settings = Settings()
