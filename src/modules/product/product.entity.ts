import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column()
    category: string;

    @Column("float")
    price: number;

    @Column()
    currency: string;

    @Column("text")
    description: string;

    @Column({ default: true })
    availability: boolean;

    @Column()
    stock: number;

    @Column("jsonb")
    dimensions: Record<string, any>;

    @Column()
    weight: number;

    @Column("text", { array: true }) // Dizinin string olarak tutulacağını belirtiyoruz
    features: string[]; // Özelliklerin dizisi

    @Column("text", { array: true }) // Dizinin string olarak tutulacağını belirtiyoruz
    colors: string[]; // Renklerin dizisi
}
