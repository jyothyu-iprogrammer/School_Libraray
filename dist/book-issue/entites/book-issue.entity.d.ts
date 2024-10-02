import { Book } from '../../books/entities/book.entity';
import { Student } from '../../students/entities/student.entity';
export declare class BookIssue {
    id: number;
    book: Book;
    student: Student;
    issueDate: Date;
    returnDate: Date;
    fine_collected: number;
    created_by: number;
    updated_by: number;
    deleted_by: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
