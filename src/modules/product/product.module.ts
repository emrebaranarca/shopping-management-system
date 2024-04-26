import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Product])],
  providers: [ProductService,ProductRepository],
  controllers: [ProductController],
  exports:[ProductRepository,ProductService]
})
export class ProductModule {}
