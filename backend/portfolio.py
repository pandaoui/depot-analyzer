from main import Stock
from datetime import date


class Portfolio:
    def __init__(self):
        self.stocks = []

    def add(self, stock: Stock):
        self.stocks.append(stock)

portfolio = Portfolio()
portfolio.add(Stock(symbol="AAPL", name="Apple Inc.", quantity=10, purchase_price=175.0, purchase_date=date(2024, 1, 15)))
print(portfolio.stocks)