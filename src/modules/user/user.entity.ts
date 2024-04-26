import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { Address } from "../address/address.entity";
import { Order } from "../order/order.entity";


@Entity('users')
export class User{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @Column()
    surname:string

    @Column()
    email:string

    @Column()
    @Exclude({toPlainOnly:true})
    password:string

    @OneToMany(type=>Address,address=>address.user,{eager:true})
    addresses:Address[]

    @OneToMany(type=>Order,order=>order.user,{eager:true})
    orders:Order[]
}