from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum, Boolean
from sqlalchemy.orm import relationship
from .database import Base
import enum
from datetime import datetime

class RoleEnum(str, enum.Enum):
    advisor = 'advisor'
    admin = 'admin'

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(RoleEnum), default=RoleEnum.advisor)

class Client(Base):
    __tablename__ = 'clients'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    portfolios = relationship('Portfolio', back_populates='client')

class Portfolio(Base):
    __tablename__ = 'portfolios'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    client_id = Column(Integer, ForeignKey('clients.id'))
    client = relationship('Client', back_populates='portfolios')
    holdings = relationship('Holding', back_populates='portfolio')

class Holding(Base):
    __tablename__ = 'holdings'
    id = Column(Integer, primary_key=True, index=True)
    ticker = Column(String, nullable=False)
    quantity = Column(Float, nullable=False)
    portfolio_id = Column(Integer, ForeignKey('portfolios.id'))
    portfolio = relationship('Portfolio', back_populates='holdings')
    prices = relationship('Price', back_populates='holding')
    signals = relationship('Signal', back_populates='holding')

class Price(Base):
    __tablename__ = 'prices'
    id = Column(Integer, primary_key=True, index=True)
    holding_id = Column(Integer, ForeignKey('holdings.id'))
    date = Column(DateTime, nullable=False)
    close = Column(Float, nullable=False)
    holding = relationship('Holding', back_populates='prices')

class SignalEnum(str, enum.Enum):
    buy = 'Buy'
    hold = 'Hold'
    sell = 'Sell'

class Signal(Base):
    __tablename__ = 'signals'
    id = Column(Integer, primary_key=True, index=True)
    holding_id = Column(Integer, ForeignKey('holdings.id'))
    generated_at = Column(DateTime, default=datetime.utcnow)
    recommendation = Column(Enum(SignalEnum), nullable=False)
    holding = relationship('Holding', back_populates='signals')
