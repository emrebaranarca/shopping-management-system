import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import jwtConfig from './config/jwt.config';
import { AddressModule } from './modules/address/address.module';
import { ProductModule } from './modules/product/product.module';
import { BasketModule } from './modules/basket/basket.module';
import { OrderModule } from './modules/order/order.module';
import { PrivacyPolicyModule } from './modules/privacy-policy/privacy-policy.module';
import { VersionModule } from './modules/version/version.module';
import { ComplaintModule } from './modules/complaint/complaint.module';


@Module({
  imports: [ComplaintModule,VersionModule,PrivacyPolicyModule,OrderModule,BasketModule,ProductModule,AddressModule,UserModule,ConfigModule.forRoot({
    isGlobal:true,
    load:[databaseConfig,jwtConfig]
  }),TypeOrmModule.forRootAsync({
    inject:[ConfigService],
    useFactory:async(configService:ConfigService)=>({
      type:"postgres",
      host:configService.get("database.host"),
      port:configService.get("database.port"),
      username:configService.get("database.username"),
      password:configService.get("database.password"),
      database:configService.get("database.database"),
      autoLoadEntities:true,
      synchronize: true,
      logging: true,
      entities: [],
      subscribers: [],
      migrations: [],
    })
  }),
],
  controllers: [],
  providers: [],
})
export class AppModule {}
