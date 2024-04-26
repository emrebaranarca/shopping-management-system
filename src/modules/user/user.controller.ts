import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Post('/sign-up')
    signUp(@Body() signUpDto:SignUpDto):Promise<void>{
        return this.userService.signUp(signUpDto)
    }

    @Post('/sign-in')
    signIn(@Body() signInDto:SignInDto):Promise<{accessToken:string}>{
        return this.userService.signIn(signInDto)
    }

    @UseGuards(JwtAuthGuard)
    @Put('/change-password')
    changePassword(@Body('email') email:string,@Body() changePasswordDto):Promise<void>{
        return this.userService.changePassword(changePasswordDto)
    }

    @UseGuards(JwtAuthGuard)
    @Put('/update-profile/:id')
    updateProfile(@Param('id') id:string,@Body() updateProfileDto){
        return this.userService.updateProfile(id,updateProfileDto)
    }

    



}
