from fastapi import FastAPI, Depends
from schemas import StockCreate
from models import Stock
from database import Base, SessionLocal, engine
from sqlalchemy.orm import Session

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Depot Analyzer läuft"}

@app.get("/stocks")
def get_stocks(db: Session = Depends(get_db)):
    return db.query(Stock).all()

@app.post("/stocks")
def create_stock(stock_data: StockCreate, db: Session = Depends(get_db)):
    stock = Stock(
        symbol=stock_data.symbol,
        name=stock_data.name,
        quantity=stock_data.quantity,
        purchase_price=stock_data.purchase_price,
        purchase_date=stock_data.purchase_date,
        current_price=stock_data.current_price
    )
    db.add(stock)
    db.commit()
    return {"message": f"Aktie {stock.symbol} hinzugefügt"}
