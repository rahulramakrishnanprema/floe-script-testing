# Portfolio Advisory Platform

## Overview
A full‑stack application that lets financial advisors manage client portfolios of Indian equities and receive automated Buy/Hold/Sell signals based on historical price performance.

## Tech Stack
- **Backend**: Python 3.12, FastAPI, PostgreSQL, SQLAlchemy, JWT
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Recharts, Framer Motion
- **CI/CD**: GitHub Actions, Docker, AWS ECS (or Cloud Run)

## Quick Start (Development)
```bash
# Clone repo
git clone <repo-url>
cd portfolio-advisory

# Backend setup
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # edit DATABASE_URL and JWT_SECRET
uvicorn src.main:app --reload

# Frontend setup
cd ../frontend
npm install
cp .env.example .env   # ensure VITE_API_URL points to backend URL
npm run dev
```

For full deployment, testing, and monitoring instructions see the respective `backend/README.md` and `frontend/README.md` files.