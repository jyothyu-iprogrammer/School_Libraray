import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { BookIssue } from '../BookIssue/entites/book-issue.entity';
import { CreateBookIssueDto } from './dto/create-book-issue.dto';
import { Book } from '../Books/entities/book.entity';
import { Student } from '../Students/entities/student.entity';

@Injectable()
export class BookIssueService {
  constructor(
    @InjectRepository(BookIssue)
    private readonly bookIssueRepository: Repository<BookIssue>,

    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  // Method to issue a book to a student
  async create(createBookIssueDto: CreateBookIssueDto): Promise<BookIssue> {
    return await this.bookIssueRepository.manager.transaction(async (entityManager: EntityManager) => {
      // Check if the student has an active book issue (i.e., where returnDate is null)
      const activeIssue = await entityManager.findOne(BookIssue, {
        where: {
          student: { id: createBookIssueDto.student_id },
          returnDate: null, // Only consider books that have not been returned
        },
      });

      // If the student has an active book issue, prevent them from issuing another book
      if (activeIssue) {
        throw new BadRequestException(
          'A student can only issue one book at a time until the previous book is returned.'
        );
      }

      // Create a new book issue record since the student has no active issues
      const newBookIssue = entityManager.create(BookIssue, {
        ...createBookIssueDto,
        issueDate: new Date(), // Set issue date to the current date
        returnDate: null, // A new book issue will not have a return date
        book: { id: createBookIssueDto.book_id },
        student: { id: createBookIssueDto.student_id },
      });

      return await entityManager.save(newBookIssue); // Save the new book issue
    });
  }

  // Return a book
  async returnBook(studentId: number, bookId: number): Promise<BookIssue> {
    return await this.bookIssueRepository.manager.transaction(async (entityManager: EntityManager) => {
      const existingIssue = await entityManager.findOne(BookIssue, {
        where: {
          student: { id: studentId },
          book: { id: bookId },
          returnDate: null, // Look for an unreturned book issue
        },
      });

      if (!existingIssue) {
        throw new NotFoundException("No active book issue found for the student.");
      }

      // Update the return date to mark the book as returned
      existingIssue.returnDate = new Date();
      return await entityManager.save(existingIssue); // Save the updated book issue
    });
  }

  // Method to find one book issue by ID
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

  // Method to find all book issues
  async findAll(): Promise<BookIssue[]> {
    return this.bookIssueRepository.find({ relations: ['book', 'student'] });
  }

  // Method to find a student's library history
  async findStudentHistory(studentId: number): Promise<BookIssue[]> {
    return this.bookIssueRepository.find({
      where: { student: { id: studentId } },
      relations: ['book', 'student'],
    });
  }
}
