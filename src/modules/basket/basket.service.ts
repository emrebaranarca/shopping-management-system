import { Injectable } from '@nestjs/common';
import { BasketItem } from './basketItem.interface';
import { ProductRepository } from '../product/product.repository';
import { OrderRepository } from '../order/order.repository';
import { User } from '../user/user.entity';
import { OrderDetailDto } from '../order/dto/order-detail.dto';

@Injectable()
export class BasketService {

    constructor(private productRepository: ProductRepository,
        private orderRepository:OrderRepository
    ) { }
    private basketItems:BasketItem[] = []

    async addProductToBasket(productId:number):Promise<void>{
        const product = await this.productRepository.getProducts(productId)
        let quantity = 1
        if(product){
            if(this.basketItems.find(item=>item.productId===productId)){
                let index = this.basketItems.findIndex(item=>item.productId===productId)
                this.basketItems[index].quantity+=1
            }else{
                const basketItem:BasketItem = {
                    productId:productId,
                    product:product,
                    quantity:quantity
                }
                this.basketItems.push(basketItem)
                quantity+=1
            }
        }else{
            throw new Error('Product not found')
        }
    }


    async getBasketItems():Promise<{items: BasketItem[], totalPrice: number}>{
        let totalPrice=0
        this.basketItems.forEach(item=>{
            totalPrice += item.product.price * item.quantity
        })
        return {items: this.basketItems, totalPrice: totalPrice}
    }


    async removeProductFromBasket(productId:number):Promise<void>{
        const index= this.basketItems.findIndex(item=>item.productId===productId)
        if(index>=0){
            if(this.basketItems[index].quantity>1){
                this.basketItems[index].quantity -= 1;
            }else{
                this.basketItems = this.basketItems.filter(item=>item.productId!==productId)
            }
        }

    }

    async buyBasketItems(user:User,orderDetailDto:OrderDetailDto): Promise<string> {
        let price=0
        const productNames=[]
        this.basketItems.forEach(item=>{
            price += item.product.price * item.quantity
            productNames.push(item.product.name)
        })
        orderDetailDto.price=price.toString()
        orderDetailDto.productName=productNames.join(',')
        this.orderRepository.createOrder(user,orderDetailDto)
        this.basketItems = [];
        return "Basket items bought successfully";
    }

}
