import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Payload } from './interfaces/jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository:UserRepository,private configService:ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("secret"),
    });
  }

  async validate(payload: Payload) {
    const {name}=payload
    const user:User=await this.userRepository.findOneBy({name:name})
    if(!user){
        throw new UnauthorizedException()
    }
    
    return user

  }
}