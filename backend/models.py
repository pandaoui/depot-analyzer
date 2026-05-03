from datetime import date
from typing import Optional
from sqlalchemy.orm import Mapped, mapped_column
from database import Base


class Stock(Base):
    __tablename__ = "stocks"

    symbol: Mapped[str] = mapped_column(primary_key=True)
    name: Mapped[str]
    quantity: Mapped[float]
    purchase_price: Mapped[float]
    purchase_date: Mapped[date]
    current_price: Mapped[Optional[float]]

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