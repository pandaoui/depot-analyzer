from dataclasses import dataclass
from datetime import date
from typing import Optional

@dataclass
class Stock:
    symbol: str
    name: str
    quantity: float
    purchase_price: float
    purchase_date: date
    current_price: Optional[float] = None

    @property
    def purchase_value(self) -> float:
        return self.quantity * self.purchase_price

    @property
    def profit_loss(self) -> Optional[float]:
        if self.current_price is None:
            return None
        return (self.quantity * self.current_price) - self.purchase_value
    
    @property
    def profit_loss_percentage(self) -> Optional[float]:
        if self.current_price is None:
            return None
        return (self.current_price - self.purchase_price) / self.purchase_price * 100

