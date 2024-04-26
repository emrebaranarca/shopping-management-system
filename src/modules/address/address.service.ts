import { Injectable } from '@nestjs/common';
import { AddressRepository } from './address.repository';
import { CreateAddressDto } from './dto/create-address.dto';
import { User } from '../user/user.entity';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './address.entity';

@Injectable()
export class AddressService {
    constructor(private addressRepository:AddressRepository){}

    createAddress(createAddressDto:CreateAddressDto,user:User):Promise<void>{
        return this.addressRepository.createAddress(createAddressDto,user)
    }

    updateAddress(id:number,updateAddressDto:UpdateAddressDto,user:User):Promise<Address>{
        return this.addressRepository.updateAddress(id,updateAddressDto,user)
    }

    deleteAddress(id:number,user:User){
        this.addressRepository.deleteAddress(id,user)
    }

    getAllAddresses(user:User):Promise<Address[]>{
        return this.addressRepository.getAllAddresses(user)
    }


}
