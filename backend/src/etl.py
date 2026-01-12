import requests
from datetime import datetime
from sqlalchemy.orm import Session
from .models import Holding, Price
from .database import SessionLocal

MOCK_API_URL = 'https://api.mockstockdata.com/india'

def fetch_price_data(ticker: str):
    """Mock fetch of last 30 days price data.
    Returns a list of dicts with 'date' (ISO string) and 'close' (float).
    """
    return [{
        'date': (datetime.utcnow()).isoformat(),
        'close': 100.0 + (hash(ticker) % 50)
    } for _ in range(30)]

def run_etl():
    """Iterate over holdings and store fetched price data.
    This function opens a DB session, queries all holdings, fetches mock price data,
    inserts rows into the Price table and commits.
    """
    db: Session = SessionLocal()
    try:
        holdings = db.query(Holding).all()
        for holding in holdings:
            price_entries = fetch_price_data(holding.ticker)
            for entry in price_entries:
                price = Price(
                    holding_id=holding.id,
                    date=datetime.fromisoformat(entry['date']),
                    close=entry['close']
                )
                db.add(price)
        db.commit()
    finally:
        db.close()
