import { Product } from "../product/product.entity";

export interface BasketItem {
    product:Product
    productId: number;
    quantity: number;
}
  