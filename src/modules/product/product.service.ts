// product.service.ts
import { createConnection } from "typeorm";
import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductRepository } from "./product.repository";

@Injectable()
export class ProductService {

    constructor(private productRepository: ProductRepository) { }

    async getProducts(id:number): Promise<Product> {
        return this.productRepository.getProducts(id)
    }

    async getAllProducts(page:number,sortBy:string,search:string): Promise<Product[]> {
        return this.productRepository.getAllProducts(page,sortBy,search)
    }
    


}
