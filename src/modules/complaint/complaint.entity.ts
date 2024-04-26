import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Complaint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

}
