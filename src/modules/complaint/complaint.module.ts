import { Module } from '@nestjs/common';
import { ComplaintService } from './complaint.service';
import { CompliantGateway } from './complaint.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complaint } from './complaint.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Complaint])],
  providers: [ComplaintService,CompliantGateway],
  controllers: []
})
export class ComplaintModule {}
