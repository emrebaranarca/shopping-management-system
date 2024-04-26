import { Controller, Get, UseGuards, Request, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../user/jwt-auth.guard';
import { User } from '../user/user.entity';
import { Order } from './order.entity';

@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
    constructor(private orderService:OrderService) {}

    @Get('/get-all-orders')
    getAllOrders(@Request() req):Promise<Order[]>{
        const user:User=req.user
        return this.orderService.getOrders(user)
    }

    @Get('/get-order-by-id/:id')
    getOrderById(@Request() req,@Param('id') id):Promise<Order>{
        const user:User=req.user
        return this.orderService.getOrderById(id,user)
    }




}
