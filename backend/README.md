# Backend Documentation

## Prerequisites
- Python 3.12+
- PostgreSQL instance (or SQLite for quick testing)

## Setup
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # configure DATABASE_URL and JWT_SECRET
```

## Database Migration / Seeding
The project uses SQLAlchemy's `create_all` on startup, so no explicit migration tool is required for the demo. To seed mock data run:
```bash
python -c "from src.etl import run_etl; run_etl()"
python -c "from src.signal_engine import generate_signals; generate_signals()"
```

## Running the API
```bash
uvicorn src.main:app --reload
```
The API will be available at `http://localhost:8000`.

## API Docs
FastAPI automatically provides Swagger UI at `http://localhost:8000/docs` and ReDoc at `http://localhost:8000/redoc`.

## Security Notes
- Passwords are stored in plain text for the demo only. Replace `verify_password` with a proper hashing algorithm (e.g., bcrypt) before production.
- JWT secret must be a strong, random string.
- CORS is wide‑open (`*`) for development; restrict origins in production.
