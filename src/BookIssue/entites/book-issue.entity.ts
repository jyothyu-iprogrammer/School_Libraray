import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { Book } from '../../Books/entities/book.entity';
import { Student } from '../../Students/entities/student.entity';

@Entity('book_issues')
export class BookIssue {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, { eager: true })
  @JoinColumn({ name: 'book_id' }) // Foreign key column name
  book: Book; // Foreign Key reference to Book entity

  @ManyToOne(() => Student, { eager: true })
  @JoinColumn({ name: 'student_id' }) // Foreign key column name
  student: Student; // Foreign Key reference to Student entity

  @Column()
  issueDate: Date; // Date the book was issued

  @Column({ nullable: true })
  returnDate: Date | null; // Date the book was returned, can be null

  @Column({ nullable: true, type: 'decimal' })
  fine_collected: number | null; // Fine for late return, or NULL/0 if returned on time

  @Column({ nullable: true })
  created_by: number; // ID of the user who created the record

  @Column({ nullable: true })
  updated_by: number; // ID of the user who last updated the record

  @Column({ nullable: true })
  deleted_by: number; // ID of the user who marked the record as deleted

  @CreateDateColumn()
  created_at: Date; // Timestamp for when the record was created

  @Column({ nullable: true })
  updated_at: Date; // Timestamp for when the record was last updated

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date; // Timestamp for when the record was deleted
}
