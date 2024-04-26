import { Body, Controller, Delete, Get, Param, Post,Put,Request, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { User } from '../user/user.entity';
import { JwtAuthGuard } from '../user/jwt-auth.guard';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './address.entity';

@UseGuards(JwtAuthGuard)
@Controller('address')
export class AddressController {
    constructor(private addressService: AddressService) {}

    @Post('/create-address')
    createAddress(@Body() createAddressDto:CreateAddressDto,@Request() req):Promise<void>{
        const user:User=req.user
        return this.addressService.createAddress(createAddressDto,user)

    }

    @Put('/update-address/:id')
    updateTask(@Param('id') id:number,@Body() updateAddressDto:UpdateAddressDto,
    @Request() req):Promise<Address>{
        const user:User=req.user
        return this.addressService.updateAddress(id,updateAddressDto,user)
    }

    @Delete('delete-address/:id')
    deleteAddressByID(@Param('id') id:number,@Request() req){
        const user:User=req.user
        return this.addressService.deleteAddress(id,user)
    }

    @Get('/get-all-addresses')
    getAllAddresses(@Request() req):Promise<Address[]>{
        const user:User=req.user
        return this.addressService.getAllAddresses(user)
    }

}
