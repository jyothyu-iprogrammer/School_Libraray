import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { Author } from '../../Authors/enitites/author.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  isbn: string;

  @ManyToMany(() => Author, (author) => author.books)
  @JoinTable({ name: 'book_authors' }) // This creates the join table
  authors: Author[];

  @Column({ nullable: true })
  created_by: number;

  @Column({ nullable: true })
  updated_by: number;

  @Column({ nullable: true })
  deleted_by: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true }) 
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;
}
