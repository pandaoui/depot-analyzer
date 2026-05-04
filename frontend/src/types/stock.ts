export interface Stock {
    symbol: string;
    name: string;
    quantity: number;
    purchase_price: number;
    purchase_date: string;
    current_price: number | null;
}