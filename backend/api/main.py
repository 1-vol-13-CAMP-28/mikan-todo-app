from fastapi import FastAPI
from api.routers import user, task, item, auth


app = FastAPI()
app.include_router(auth.router)
app.include_router(user.router)
# app.include_router(task.router)
app.include_router(item.router)

