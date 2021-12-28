import { Customer } from "./customer.interface";
import { Product } from "./product.interface";

export interface Order {
    products: Product[],
    customer: Customer
}

