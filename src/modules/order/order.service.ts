import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
    constructor(private orderRepository:OrderRepository) {}

    async getOrders(user):Promise<Order[]>{
        return this.orderRepository.getOrders(user)
    }

    async getOrderById(id:number,user):Promise<Order>{
        return this.orderRepository.getOrderById(id,user)
    }
}
