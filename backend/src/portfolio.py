from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List

from .schemas import PortfolioCreate, PortfolioRead, HoldingCreate, HoldingRead, SignalRead
from .models import Portfolio, Holding, Signal
from .database import SessionLocal
from .auth import get_current_user, role_required

router = APIRouter(prefix='/portfolios', tags=['portfolios'], dependencies=[Depends(get_current_user)])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get('/', response_model=List[PortfolioRead])
def list_portfolios(skip: int = Query(0, ge=0), limit: int = Query(10, gt=0), db: Session = Depends(get_db)):
    portfolios = db.query(Portfolio).offset(skip).limit(limit).all()
    return portfolios

@router.post('/', response_model=PortfolioRead, status_code=status.HTTP_201_CREATED)
def create_portfolio(portfolio: PortfolioCreate, db: Session = Depends(get_db), user = Depends(role_required('advisor'))):
    db_portfolio = Portfolio(name=portfolio.name, client_id=portfolio.client_id)
    db.add(db_portfolio)
    db.commit()
    db.refresh(db_portfolio)
    return db_portfolio

@router.get('/{portfolio_id}/holdings', response_model=List[HoldingRead])
def get_holdings(portfolio_id: int, db: Session = Depends(get_db)):
    holdings = db.query(Holding).filter(Holding.portfolio_id == portfolio_id).all()
    return holdings

@router.post('/{portfolio_id}/holdings', response_model=HoldingRead)
def add_holding(portfolio_id: int, holding: HoldingCreate, db: Session = Depends(get_db), user = Depends(role_required('advisor'))):
    db_holding = Holding(**holding.dict(), portfolio_id=portfolio_id)
    db.add(db_holding)
    db.commit()
    db.refresh(db_holding)
    return db_holding

@router.get('/{portfolio_id}/signals', response_model=List[SignalRead])
def get_signals(portfolio_id: int, db: Session = Depends(get_db)):
    signals = db.query(Signal).join(Holding).filter(Holding.portfolio_id == portfolio_id).all()
    return signals

portfolio_router = router
