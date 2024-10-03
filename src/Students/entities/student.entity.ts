import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  rollNo: string;

  @Column()
  grade: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true }) 
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;
}
