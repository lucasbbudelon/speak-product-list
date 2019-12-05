export interface Product {
    id: number | string;
    name: string;
    description: string;
    price: number;
}

export interface ItemPurchase {
    amount: number;
    product: Product;
}
