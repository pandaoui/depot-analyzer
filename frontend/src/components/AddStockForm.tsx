import { useEffect, useState } from "react";
import type { Stock } from "../types/stock";

interface AddStockFormProps {
  onStockAdded: () => void;
  selectedStock: Stock | null;
  onClearSelection: () => void;
}
function AddStockForm({
  onStockAdded,
  selectedStock,
  onClearSelection,
}: AddStockFormProps) {
  const [symbol, setSymbol] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [purchasePrice, setPurchasePrice] = useState<string>("");
  const [purchaseDate, setPurchaseDate] = useState<string>("");

  const handleSubmit = async () => {
    if (selectedStock) {
      // Update
      await fetch(`http://localhost:8000/stocks/${selectedStock.symbol}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol: symbol,
          name: name,
          quantity: parseFloat(quantity),
          purchase_price: parseFloat(purchasePrice),
          purchase_date: purchaseDate,
        }),
      });
    } else {
      // Neu erstellen
      await fetch("http://localhost:8000/stocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol: symbol,
          name: name,
          quantity: parseFloat(quantity),
          purchase_price: parseFloat(purchasePrice),
          purchase_date: purchaseDate,
        }),
      });
    }
    onStockAdded();
    setSymbol("");
    setName("");
    setQuantity("");
    setPurchasePrice("");
    setPurchaseDate("");
    onClearSelection();
  };
  const handleCancel = () => {
    setSymbol("");
    setName("");
    setQuantity("");
    setPurchasePrice("");
    setPurchaseDate("");
    onClearSelection();
  };

  useEffect(() => {
    if (selectedStock) {
      setSymbol(selectedStock.symbol);
      setName(selectedStock.name);
      setQuantity(selectedStock.quantity.toString());
      setPurchasePrice(selectedStock.purchase_price.toString());
      setPurchaseDate(selectedStock.purchase_date);
    }
  }, [selectedStock]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {selectedStock ? "Aktie bearbeiten" : "Aktie hinzufügen"}
      </h2>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Symbol</label>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="z.B. AAPL"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="z.B. Apple Inc."
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Menge</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="z.B. 10"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Kaufpreis</label>
        <input
          type="number"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="z.B. 150.00"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Kaufdatum</label>
        <input
          type="date"
          value={purchaseDate}
          onChange={(e) => setPurchaseDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        {selectedStock ? "Aktualisieren" : "Hinzufügen"}
      </button>
      {selectedStock && (
        <button
          className="mt-4 ml-2 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          onClick={handleCancel}
        >
          Abbrechen
        </button>
      )}
    </div>
  );
}

export default AddStockForm;
