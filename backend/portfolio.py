from typing import Optional
from main import Stock



class Portfolio:
    def __init__(self):
        self.stocks = {}

    def add(self, stock: Stock):
        self.stocks[stock.symbol] = stock
    
    def get(self, symbol: str) -> Optional[Stock]:
        return self.stocks.get(symbol)
    
    def remove(self, symbol: str): 
        if symbol in self.stocks:
            del self.stocks[symbol]
        else:
            raise ValueError(f"{symbol} nicht im Portfolio gefunden")
        
    def total_purchase_value(self) -> float:
        return sum(stock.purchase_value for stock in self.stocks.values())
        
