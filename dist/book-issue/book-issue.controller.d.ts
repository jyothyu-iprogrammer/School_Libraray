import { BookIssueService } from './book-issue.service';
import { CreateBookIssueDto } from './dto/create-book-issue.dto';
import { BookIssue } from './entites/book-issue.entity';
export declare class BookIssueController {
    private readonly bookIssueService;
    constructor(bookIssueService: BookIssueService);
    create(createBookIssueDto: CreateBookIssueDto): Promise<BookIssue>;
    findOne(id: string): Promise<BookIssue>;
    findAll(): Promise<BookIssue[]>;
}
