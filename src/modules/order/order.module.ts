import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Order])],
  providers: [OrderService,OrderRepository],
  controllers: [OrderController],
  exports:[OrderRepository]
})
export class OrderModule {}
