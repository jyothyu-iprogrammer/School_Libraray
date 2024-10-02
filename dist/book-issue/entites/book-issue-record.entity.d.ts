import { Student } from '../../students/entities/student.entity';
import { Book } from '../../books/entities/book.entity';
export declare class BookIssueRecord {
    issueId: number;
    book: Book;
    student: Student;
    issueDate: Date;
    returnDate: Date;
    fine: number;
}
