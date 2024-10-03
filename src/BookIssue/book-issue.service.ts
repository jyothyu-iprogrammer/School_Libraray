import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
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
  ) { }

  // async create(createBookIssueDtos: CreateBookIssueDto[]): Promise<BookIssue[]> {
  //   const bookIssues = [];

  //   for (const dto of createBookIssueDtos) {
  //     const existingIssue = await this.bookIssueRepository.findOne({
  //       where: {
  //         student: { id: dto.student_id },
  //         returnDate: null // Ensure the book is currently issued
  //       }
  //     });

  //     if (existingIssue) {
  //       throw new BadRequestException("A student can only issue one book at a time.");
  //     }

  //     const bookIssue = this.bookIssueRepository.create({
  //       ...dto,
  //       issueDate: new Date(dto.issueDate),
  //       book: { id: dto.book_id },
  //       student: { id: dto.student_id },
  //     });

  //     bookIssues.push(bookIssue);
  //   }

  //   return await this.bookIssueRepository.save(bookIssues);
  // }


  // Update return date for a book issue
  // async returnBook(issueId: number, returnDate: string): Promise<BookIssue> {
  //   const bookIssue = await this.bookIssueRepository.findOne({ where: { id: issueId } });

  //   if (!bookIssue) {
  //     throw new NotFoundException('Book issue record not found');
  //   }

  //   bookIssue.returnDate = new Date(returnDate); // Set the return date
  //   return this.bookIssueRepository.save(bookIssue); // Save the updated record
  // }
  async create(createBookIssueDto: CreateBookIssueDto): Promise<BookIssue> {
    const existingIssue = await this.bookIssueRepository.findOne({
      where: {
        student: { id: createBookIssueDto.student_id },
        returnDate: null, // Ensure the book is currently issued
      },
    });

    if (existingIssue) {
      throw new BadRequestException("A student can only issue one book at a time.");
    }

    const bookIssue = this.bookIssueRepository.create({
      ...createBookIssueDto,
      issueDate: new Date(createBookIssueDto.issueDate),
      book: { id: createBookIssueDto.book_id },
      student: { id: createBookIssueDto.student_id },
    });

    return await this.bookIssueRepository.save(bookIssue);
  }

  async returnBook(studentId: number, bookId: number): Promise<BookIssue> {
    const existingIssue = await this.bookIssueRepository.findOne({
      where: {
        student: { id: studentId },
        book: { id: bookId },
        returnDate: null, // Ensure the book is currently issued
      },
    });

    if (!existingIssue) {
      throw new NotFoundException("No active book issue found for the student.");
    }

    // Update the return date
    existingIssue.returnDate = new Date();
    return await this.bookIssueRepository.save(existingIssue);
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
