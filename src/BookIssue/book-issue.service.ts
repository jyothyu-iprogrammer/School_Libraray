import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookIssue } from './entites/book-issue.entity';
import { CreateBookIssueDto } from './dto/create-book-issue.dto';
import { Book } from '../Books/entities/book.entity';
import { Student } from '../Students/entities/student.entity';

@Injectable()
export class BookIssueService {
  constructor(
    @InjectRepository(BookIssue)
    private readonly bookIssueRepository: Repository<BookIssue>,

    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>, // Ensure correct injection

    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  // Create a new book issue
  async create(createBookIssueDtos: CreateBookIssueDto[]): Promise<BookIssue[]> {
    const bookIssues = createBookIssueDtos.map(dto => {
      return this.bookIssueRepository.create({
        ...dto,
        issueDate: new Date(dto.issueDate), // Convert string to Date object
        book: { id: dto.book_id }, // Map to book entity
        student: { id: dto.student_id }, // Map to student entity
      });
    });
  
    return await this.bookIssueRepository.save(bookIssues);
  }
  

  // Update return date for a book issue
  async returnBook(issueId: number, returnDate: string): Promise<BookIssue> {
    const bookIssue = await this.bookIssueRepository.findOne({ where: { id: issueId } });

    if (!bookIssue) {
      throw new NotFoundException('Book issue record not found');
    }

    bookIssue.returnDate = new Date(returnDate); // Set the return date
    return this.bookIssueRepository.save(bookIssue); // Save the updated record
  }

  async findOne(id: number): Promise<BookIssue> {
    const bookIssue = await this.bookIssueRepository.findOne({
      where: { id },
      relations: ['book', 'student'],
    });

    if (!bookIssue) {
      throw new NotFoundException(`Book issue with ID ${id} not found`);
    }

    return bookIssue;
  }

  async findAll(): Promise<BookIssue[]> {
    return this.bookIssueRepository.find({ relations: ['book', 'student'] });
  }

  // New method to find a student's library history
  async findStudentHistory(studentId: number): Promise<BookIssue[]> {
    return this.bookIssueRepository.find({
      where: { student: { id: studentId } },  // Ensure this matches your entity structure
      relations: ['book', 'student'],
    });
  }
}
