from fastapi import APIRouter

router = APIRouter()

@router.post("/signup")
async def signup():
    pass

@router.post("/signin")
async def signin():
    pass

