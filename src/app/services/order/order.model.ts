import { Product } from '../products/products.model';

export interface OrderItem {
    product: Product;
    amount: number;
    total?: number;
}
