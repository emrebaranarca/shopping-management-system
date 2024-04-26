import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { BasketService } from './basket.service';
import { JwtAuthGuard } from '../user/jwt-auth.guard';
import { User } from '../user/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('basket')
export class BasketController {
    constructor(private basketService:BasketService) {}

    @Get('/add-product-to-basket/:id')
    addProductToBasket(@Param('id') productId:number){
        return this.basketService.addProductToBasket(productId)
    }

    @Get('/get-basket-items')
    getBasketItems(){
        return this.basketService.getBasketItems()
    }

    @Get('/remove-product-from-basket/:id')
    removeProductFromBasket(@Param('id') productId:number){
        return this.basketService.removeProductFromBasket(productId)
    }

    @Get('/buy-basket-items')
    buyBasketItems(@Request() req){
        const user:User=req.user
        const orderDetailDto = req.body
        return this.basketService.buyBasketItems(user,orderDetailDto)
    }



    

}
