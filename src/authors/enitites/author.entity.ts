import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { Book } from '../../books/entities/book.entity';

@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Book, (book) => book.authors)
  books: Book[];

  @Column({ nullable: true })
  created_by: number;

  @Column({ nullable: true })
  updated_by: number;

  @Column({ nullable: true })
  deleted_by: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true }) // Regular column, will handle manually
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;
}
