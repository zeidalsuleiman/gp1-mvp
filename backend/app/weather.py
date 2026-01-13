from fastapi import APIRouter, Depends, Header
import requests
from jose import jwt

router = APIRouter()
SECRET_KEY = "hasad-secret"

def verify_token(authorization: str = Header(...)):
    token = authorization.split(" ")[1]
    jwt.decode(token, SECRET_KEY, algorithms=["HS256"])

@router.get("/")
def get_weather(lat: float, lon: float, _: str = Depends(verify_token)):
    return {"message": "Weather API placeholder", "lat": lat, "lon": lon}
