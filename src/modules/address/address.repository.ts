import { DataSource, EntityRepository,Repository } from "typeorm";
import { Address } from "./address.entity";
import { CreateAddressDto } from "./dto/create-address.dto";
import { User } from "../user/user.entity";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { NotFoundException } from "@nestjs/common";

@EntityRepository(Address)
export class AddressRepository extends Repository<Address>{
    constructor(private dataSource:DataSource){
        super(Address, dataSource.createEntityManager())
    }

    async createAddress(createAddressDto:CreateAddressDto,user:User):Promise<void>{
        const {address}=createAddressDto
        const addressEntity=this.create(
            {
                address,
                user:user
            }
        )

        await this.save(addressEntity)

    }

    async getAddressByID(id:number,user:User):Promise<Address>{
        const address=await this.findOne({where:{id:id,user:user}})
        if(!address){
            throw new NotFoundException()
        }
        
        return address
    }

    async updateAddress(id:number,updateAddressDto:UpdateAddressDto,user:User):Promise<Address>{
        const addressEntity=await this.getAddressByID(id,user)
        const {address}=updateAddressDto
        addressEntity.address=address
        this.save(addressEntity)
        return addressEntity
    }

    async deleteAddress(id:number,user:User){
        try {
            const found=await this.getAddressByID(id,user)
            await this.delete(found)
        } catch (error) {
            console.log(error);
        }
    }

    async getAllAddresses(user:User):Promise<Address[]>{
        const addresses=await this.find({where:{user:user}})
        return addresses
    }


}