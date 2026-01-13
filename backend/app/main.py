from fastapi import FastAPI
from app.auth import router as auth_router
from app.weather import router as weather_router

app = FastAPI(title="Hasad MVP")

app.include_router(auth_router, prefix="/auth")
app.include_router(weather_router, prefix="/weather")
