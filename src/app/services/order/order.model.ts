import { Product } from '../products/products.model';

export interface OrderItem {
    amount: number;
    product: Product;
}
