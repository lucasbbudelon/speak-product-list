export interface Product {
    barCode: number;
    name: string;
    description: string;
    price: number;
}

export interface ItemPurchase {
    amount: number;
    product: Product;
}
