import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { UpdateProfileDto } from './dto/updateProfile.dto';

@Injectable()
export class UserService {
    constructor(private userRepository:UserRepository){}

    signUp(signUpDto:SignUpDto):Promise<void>{
        return this.userRepository.createUser(signUpDto)
    }

    signIn(signInDto:SignInDto):Promise<{accessToken:string}>{
        return this.userRepository.signInUser(signInDto)
    }

    changePassword(changePasswordDto:ChangePasswordDto):Promise<void>{
        return this.userRepository.changePassword(changePasswordDto)
    }

    updateProfile(d:string,updateProfileDto:UpdateProfileDto){
        return this.userRepository.updateProfile(d,updateProfileDto)
    }
}
