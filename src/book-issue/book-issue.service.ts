import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookIssue } from './entites/book-issue.entity';
import { CreateBookIssueDto } from './dto/create-book-issue.dto';

@Injectable()
export class BookIssueService {
  constructor(
    @InjectRepository(BookIssue)
    private readonly bookIssueRepository: Repository<BookIssue>,
  ) {}

  async create(createBookIssueDto: CreateBookIssueDto): Promise<BookIssue> {
    const bookIssue = this.bookIssueRepository.create(createBookIssueDto);
    return this.bookIssueRepository.save(bookIssue);
  }

  async findOne(id: number): Promise<BookIssue> {
    return this.bookIssueRepository.findOne({ where: { id }, relations: ['book', 'student'] });
  }

  async findAll(): Promise<BookIssue[]> {
    return this.bookIssueRepository.find({ relations: ['book', 'student'] });
  }
}
