import { Repository } from 'typeorm';
import { BookIssue } from '../BookIssue/entites/book-issue.entity';
import { Student } from '../Students/entities/student.entity';
export declare class DashboardService {
    private bookIssueRepository;
    private studentRepository;
    constructor(bookIssueRepository: Repository<BookIssue>, studentRepository: Repository<Student>);
    getDashboardData(): Promise<any[]>;
}
