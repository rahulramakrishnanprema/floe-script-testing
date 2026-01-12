from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .auth import auth_router
from .portfolio import portfolio_router
from .database import engine, Base

app = FastAPI(title='Portfolio Advisory API', version='1.0.0')

# CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Create tables on startup
@app.on_event('startup')
def on_startup():
    Base.metadata.create_all(bind=engine)

# Health‑check endpoint
@app.get('/health', tags=['health'])
def health_check():
    return {'status': 'ok'}

# Include routers
app.include_router(auth_router)
app.include_router(portfolio_router)
