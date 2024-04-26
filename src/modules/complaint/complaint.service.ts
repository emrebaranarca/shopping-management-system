import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Complaint } from './complaint.entity';

@Injectable()
export class ComplaintService {
  constructor(
    @InjectRepository(Complaint)
    private readonly complaintRepository: Repository<Complaint>,
  ) {}

  async saveComplaint(message: string): Promise<void> {
    const complaint = new Complaint();
    complaint.message = message;
    await this.complaintRepository.save(complaint);
    console.log('Complaint saved:', complaint);
  }
}
