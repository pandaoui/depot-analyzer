from models import Stock
from portfolio import Portfolio
from datetime import date

def test_add_stock():
    portfolio = Portfolio()
    stock = Stock(symbol="AAPL", name="Apple Inc.", quantity=10, purchase_price=175.0, purchase_date=date(2024, 1, 15))
    portfolio.add(stock)
    assert portfolio.get("AAPL") == stock

def test_remove_stock():
    portfolio = Portfolio()
    stock = Stock(symbol="AAPL", name="Apple Inc.", quantity=10, purchase_price=175.0, purchase_date=date(2024, 1, 15))
    portfolio.add(stock)
    portfolio.remove("AAPL")
    assert portfolio.get("AAPL") is None

def test_total_purchase_value():
    portfolio = Portfolio()
    stock1 = Stock(symbol="AAPL", name="Apple Inc.", quantity=10, purchase_price=175.0, purchase_date=date(2024, 1, 15))
    stock2 = Stock(symbol="GOOGL", name="Alphabet Inc.", quantity=5, purchase_price=1500.0, purchase_date=date(2024, 2, 20))
    portfolio.add(stock1)
    portfolio.add(stock2)
    assert portfolio.total_purchase_value() == (10 * 175.0) + (5 * 1500.0)