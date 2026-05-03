from pydantic import BaseModel
from datetime import date
from typing import Optional

class StockCreate(BaseModel):
    symbol: str
    name: str
    quantity: float
    purchase_price: float
    purchase_date: date
    current_price: Optional[float] = None