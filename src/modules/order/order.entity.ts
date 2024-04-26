import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    productName:string
    
    @Column()
    price:string

    @ManyToOne(type=>User,user=>user.orders,{eager:false})
    user:User
}