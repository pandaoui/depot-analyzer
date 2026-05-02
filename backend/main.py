from dataclasses import dataclass
from datetime import date

@dataclass
class Stock:
    symbol: str
    name: str
    quantity: float
    purchase_price: float
    purchase_date: date

