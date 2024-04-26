import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[TypeOrmModule.forFeature([User]),
JwtModule.registerAsync({
  inject:[ConfigService],
  useFactory:async(configService:ConfigService)=>({
    secret:configService.get(("secret")),
    signOptions:{
      expiresIn:'30m'
    }
  })
}),PassportModule],
  controllers: [UserController],
  providers: [UserService,UserRepository,JwtStrategy]
})
export class UserModule {}
