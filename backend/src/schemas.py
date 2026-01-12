from pydantic import BaseModel, Field
from typing import List, Optional
import datetime

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = 'bearer'

class PortfolioCreate(BaseModel):
    name: str
    client_id: int

class PortfolioRead(BaseModel):
    id: int
    name: str
    client_id: int

    class Config:
        orm_mode = True

class HoldingCreate(BaseModel):
    ticker: str
    quantity: float
    portfolio_id: int

class HoldingRead(BaseModel):
    id: int
    ticker: str
    quantity: float
    portfolio_id: int

    class Config:
        orm_mode = True

class SignalRead(BaseModel):
    id: int
    holding_id: int
    generated_at: datetime.datetime
    recommendation: str

    class Config:
        orm_mode = True
