import type { Stock } from "../types/stock";

interface StockTableProps {
  stocks: Stock[];
  onStockDeleted: () => void;
  onStockEdit: (stock: Stock) => void;
}

function StockTable({ stocks, onStockDeleted, onStockEdit }: StockTableProps) {
  const handleDelete = async (symbol: string) => {
    await fetch(`http://localhost:8000/stocks/${symbol}`, {
      method: "DELETE",
    });
    onStockDeleted();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Meine Aktien</h2>
      <table className="w-full border-collapse border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3">Symbol</th>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Anzahl</th>
            <th className="text-left p-3">Kaufpreis</th>
            <th className="text-left p-3">Kaufsumme</th>
            <th className="text-left p-3">Akt. Wert</th>
            <th className="text-left p-3">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.symbol} className="border-t hover:bg-gray-50">
              <td className="p-3">{stock.symbol}</td>
              <td className="p-3">{stock.name}</td>
              <td className="p-3">{stock.quantity}</td>
              <td className="p-3">{stock.purchase_price}</td>
              <td className="p-3">
                {(stock.quantity * stock.purchase_price).toFixed(2)} €
              </td>
              <td className="p-3">
                {stock.current_price
                  ? (stock.quantity * stock.current_price).toFixed(2) + " €"
                  : "—"}
              </td>
              <td className="p-3">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(stock.symbol)}
                >
                  Löschen
                </button>
                <button
                  className="text-blue-500 hover:text-blue-700 ml-2"
                  onClick={() => onStockEdit(stock)}
                >
                  Bearbeiten
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-right">
        <span className="font-medium">Gesamter Kaufwert: </span>
        <span className="font-bold">
          {stocks
            .reduce(
              (sum, stock) => sum + stock.quantity * stock.purchase_price,
              0,
            )
            .toFixed(2)}{" "}
          €{" "}
        </span>
      </div>
    </div>
  );
}

export default StockTable;
