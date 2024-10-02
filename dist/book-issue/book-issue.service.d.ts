import { Repository } from 'typeorm';
import { BookIssue } from './entites/book-issue.entity';
import { CreateBookIssueDto } from './dto/create-book-issue.dto';
export declare class BookIssueService {
    private readonly bookIssueRepository;
    constructor(bookIssueRepository: Repository<BookIssue>);
    create(createBookIssueDto: CreateBookIssueDto): Promise<BookIssue>;
    findOne(id: number): Promise<BookIssue>;
    findAll(): Promise<BookIssue[]>;
}
