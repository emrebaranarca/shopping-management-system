import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { JwtAuthGuard } from '../user/jwt-auth.guard';

@Controller('product')
@UseGuards(JwtAuthGuard)
export class ProductController {
    constructor(private productService: ProductService) { }

    @Get('/product-detail/:id')
    getProducts(@Param('id') id: number){
        return this.productService.getProducts(id)
    }

    @Get('/get-all-products')
    getAllProducts(
        @Query('page') page: number=1,
        @Query('sortBy') sortBy: string,
        @Query('search') search: string
    ):Promise<Product[]>{
        return this.productService.getAllProducts(page,sortBy,search)
    }
}
