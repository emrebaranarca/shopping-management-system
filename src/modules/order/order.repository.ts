import { DataSource, EntityRepository, Repository } from "typeorm";
import { Order } from "./order.entity";
import { User } from "../user/user.entity";
import { OrderDetailDto } from "./dto/order-detail.dto";

@EntityRepository(Order)
export class OrderRepository extends Repository<Order>{
    constructor(private dataSource:DataSource){
        super(Order, dataSource.createEntityManager())
    }

    async createOrder(user:User,orderDetailDto:OrderDetailDto):Promise<void>{
        const {price,productName}=orderDetailDto
        const order=this.create(
            {
                price,
                productName,
                user:user
            }
        )
        await this.save(order)
    }

    async getOrders(user:User):Promise<Order[]>{
        const orders=await this.find({where:{user:user}})
        return orders
    }

    async getOrderById(id:number,user:User):Promise<Order>{
        const order=await this.findOne({where:{id:id,user:user}})
        return order
    }


    
}