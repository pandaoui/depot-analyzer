import { useState, useEffect } from "react";
import type { Stock } from "./types/stock";
import StockTable from "./components/StockTable";
import AddStockForm from "./components/AddStockForm";

function App() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  const fetchStocks = async () => {
    const response = await fetch("http://localhost:8000/stocks");
    const data = await response.json();
    setStocks(data);
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold p-6 border-b">Depot Analyzer</h1>
      <AddStockForm 
        onStockAdded={fetchStocks}
        selectedStock={selectedStock}
        onClearSelection={() => setSelectedStock(null)}
      />
      <StockTable
        stocks={stocks}
        onStockDeleted={fetchStocks}
        onStockEdit={setSelectedStock}
      />
    </div>
  );
}

export default App;
