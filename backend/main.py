from dataclasses import dataclass
from datetime import date

@dataclass
class Stock:
    symbol: str
    name: str
    quantity: float
    purchase_price: float
    purchase_date: date

stock = Stock(symbol="AAPL", name="Apple Inc.", quantity=10, purchase_price=175.0, purchase_date=date(2024, 1, 15))
print(stock)