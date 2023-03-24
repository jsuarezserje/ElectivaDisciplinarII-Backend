import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Productos' })
export class Productos {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  code: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  image: string;

  @Column({ nullable: true })
  stock: number;

  @Column({ nullable: true })
  price: string;
}
