import { EntityRepository, Repository,DataSource } from "typeorm";
import { User } from "./user.entity";
import { SignUpDto } from "./dto/sign-up.dto";
import * as bcrypt from 'bcrypt';
import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { SignInDto } from "./dto/sign-in.dto";
import { Payload } from "./interfaces/jwt-payload.interface";
import { JwtService } from "@nestjs/jwt";
import { ChangePasswordDto } from "./dto/changePassword.dto";
import { UpdateProfileDto } from "./dto/updateProfile.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    constructor(private dataSource: DataSource,private jwtService:JwtService){
        super(User, dataSource.createEntityManager())
    }


    async createUser(signUpDto:SignUpDto):Promise<void>{
        const {email,password,name,surname}=signUpDto
        
        const salt=await bcrypt.genSalt()
        const hashedPassword=await bcrypt.hash(password,salt)

        const user=this.create(
            {
                email,
                name,
                password:hashedPassword,
                surname
            }
        )

        try {
            await this.save(user)
        } catch (error) {
            if(error.code==23505){
                throw new ConflictException('Username already exists')
            }
            throw new InternalServerErrorException()
        }

        
    }

    async signInUser(signInDto:SignInDto):Promise<{accessToken:string}>{
        const {password,email}=signInDto
        const user=await this.findOneBy({email:email})
        if(user){
            if(await bcrypt.compare(password,user.password)){
                const payload:Payload={name: user.name} 
                const accessToken:string=await this.jwtService.sign(payload)
                return {accessToken}
            }else{
                throw new UnauthorizedException("please firstly email verify and enter correct password")
            }
        }else{
            throw new UnauthorizedException("please firstly register and email verify")
        }
    }

    async changePassword(password:ChangePasswordDto):Promise<void>{
        const {oldPassword,newPassword,email}=password
        const user=await this.findOneBy({email:email})
        if(user){
            if(await bcrypt.compare(oldPassword,user.password)){
                const salt=await bcrypt.genSalt()
                const hashedPassword=await bcrypt.hash(newPassword,salt)
                user.password=hashedPassword
                await this.save(user)
            }else{
                throw new UnauthorizedException("please enter correct old password")
            }
        }else{
            throw new UnauthorizedException("please firstly register and email verify")
        }
    }

    async getUserByID(id: string): Promise<User> {
        return this.findOne({ where: { id:id } });
    }

    async updateProfile(id:string,updateProfileDto:UpdateProfileDto):Promise<User>{
        const {name,surname,email}=updateProfileDto
        const user=await this.getUserByID(id)
        user.name=name
        user.surname=surname
        user.email=email
        try {
            await this.save(user)
            return user
        }catch (error){
            throw new InternalServerErrorException()
        }
    }


}