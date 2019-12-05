export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

export interface ItemPurchase {
    amount: number;
    product: Product;
}
