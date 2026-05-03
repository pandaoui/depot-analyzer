from fastapi import FastAPI
from portfolio import Portfolio
from schemas import StockCreate
from models import Stock

app = FastAPI()
portfolio = Portfolio()

@app.get("/")
def root():
    return {"message": "Depot Analyzer läuft"}

@app.get("/stocks")
def get_stocks():
    return portfolio.stocks

@app.post("/stocks")
def create_stock(stock_data: StockCreate):
    stock = Stock(
        symbol=stock_data.symbol,
        name=stock_data.name,
        quantity=stock_data.quantity,
        purchase_price=stock_data.purchase_price,
        purchase_date=stock_data.purchase_date,
        current_price=stock_data.current_price
    )
    portfolio.add(stock)
    return {"message": f"Aktie {stock.symbol} hinzugefügt"}
