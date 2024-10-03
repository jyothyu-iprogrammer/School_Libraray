import { Repository } from 'typeorm';
import { BookIssue } from './entites/book-issue.entity';
import { CreateBookIssueDto } from './dto/create-book-issue.dto';
import { Book } from '../Books/entities/book.entity';
import { Student } from '../Students/entities/student.entity';
export declare class BookIssueService {
    private readonly bookIssueRepository;
    private readonly bookRepository;
    private readonly studentRepository;
    constructor(bookIssueRepository: Repository<BookIssue>, bookRepository: Repository<Book>, studentRepository: Repository<Student>);
    create(createBookIssueDto: CreateBookIssueDto): Promise<BookIssue>;
    returnBook(studentId: number, bookId: number): Promise<BookIssue>;
    findOne(id: number): Promise<BookIssue>;
    findAll(): Promise<BookIssue[]>;
    findStudentHistory(studentId: number): Promise<BookIssue[]>;
}
