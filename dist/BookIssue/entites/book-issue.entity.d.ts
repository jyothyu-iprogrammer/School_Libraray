import { Book } from '../../Books/entities/book.entity';
import { Student } from '../../Students/entities/student.entity';
export declare class BookIssue {
    id: number;
    book: Book;
    student: Student;
    issueDate: Date;
    returnDate: Date | null;
    fine_collected: number | null;
    created_by: number;
    updated_by: number;
    deleted_by: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
