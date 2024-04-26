import { Product } from "./product.entity";
import { DataSource, EntityRepository,Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product>{
    constructor(private dataSource:DataSource){
        super(Product, dataSource.createEntityManager())
    }

    async getProducts(id:number):Promise<Product>{
        const products=await this.findOne({where:{id:id}})
        return products
    }

    async getAllProducts(page:number,sortBy:string,search:string):Promise<Product[]>{

        const take=5
        const skip=(page-1)*take

        let query=this.createQueryBuilder('product')

        if(search){
            query=query.where('product.name like :search',{search:`%${search}%`})
        }

        if(sortBy==='asc'){
            query=query.orderBy('product.price','ASC')
        }else if(sortBy==='desc'){
            query=query.orderBy('product.price','DESC')
        }

        query=query.skip(skip).take(take)

        const products=await query.getMany()

        return products
    }

}