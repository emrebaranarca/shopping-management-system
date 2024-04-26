import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { ProductRepository } from '../product/product.repository';
import { OrderRepository } from '../order/order.repository';

@Module({
  providers: [BasketService,ProductRepository,OrderRepository],
  controllers: [BasketController]
})
export class BasketModule {}
