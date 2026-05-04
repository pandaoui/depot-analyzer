import { useState, useEffect } from "react"
import type { Stock } from "../types/stock"

function StockTable() {
  const [stocks, setStocks] = useState<Stock[]>([])

  useEffect(() => {
    fetch("http://localhost:8000/stocks")
      .then(response => response.json())
      .then(data => setStocks(data))
  }, [])

  return (
  <div>
    <h2>Meine Aktien</h2>
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Name</th>
          <th>Anzahl</th>
          <th>Kaufpreis</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map(stock => (
          <tr key={stock.symbol}>
            <td>{stock.symbol}</td>
            <td>{stock.name}</td>
            <td>{stock.quantity}</td>
            <td>{stock.purchase_price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
}

export default StockTable
