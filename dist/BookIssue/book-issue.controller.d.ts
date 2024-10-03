import { BookIssueService } from './book-issue.service';
import { CreateBookIssueDto } from './dto/create-book-issue.dto';
import { BookIssue } from '../BookIssue/entites/book-issue.entity';
export declare class BookIssueController {
    private readonly bookIssueService;
    constructor(bookIssueService: BookIssueService);
    create(createBookIssueDtos: CreateBookIssueDto[]): Promise<BookIssue[]>;
    findOne(id: string): Promise<BookIssue>;
    findAll(): Promise<BookIssue[]>;
    findStudentHistory(studentId: string): Promise<BookIssue[]>;
    returnBook(issueId: number, returnDate: string): Promise<BookIssue>;
}
