from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DOCKER_CONTAINER: str
    MYSQL_DATABASE: str
    MYSQL_HOST: str
    MYSQL_PORT: str
    MYSQL_USER: str
    MYSQL_PASSWORD: str
    TIMEZONE: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    class Config:
        env_file = ".env"

settings = Settings()

