import { IsNotEmpty } from "class-validator"

export class OrderDetailDto{

    @IsNotEmpty()
    productName:string

    @IsNotEmpty()
    price:string

}