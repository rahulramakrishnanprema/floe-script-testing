from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from .models import Holding, Price, Signal, SignalEnum
from .database import SessionLocal

def generate_signals():
    """Compute price change over last two days and store a signal.
    For each holding, fetch the two most recent price rows, calculate the percent change,
    map the change to a SignalEnum value and insert a Signal record.
    """
    db: Session = SessionLocal()
    try:
        holdings = db.query(Holding).all()
        for holding in holdings:
            recent_prices = (
                db.query(Price)
                .filter(Price.holding_id == holding.id)
                .order_by(Price.date.desc())
                .limit(2)
                .all()
            )
            if len(recent_prices) < 2:
                continue
            latest, previous = recent_prices[0], recent_prices[1]
            change = (latest.close - previous.close) / previous.close
            if change > 0.05:
                recommendation = SignalEnum.buy
            elif change < -0.05:
                recommendation = SignalEnum.sell
            else:
                recommendation = SignalEnum.hold
            signal = Signal(
                holding_id=holding.id,
                generated_at=datetime.utcnow(),
                recommendation=recommendation
            )
            db.add(signal)
        db.commit()
    finally:
        db.close()
