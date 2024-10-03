import { Controller, Post, Body, Get,Patch, Param, NotFoundException } from '@nestjs/common';
import { BookIssueService } from './book-issue.service';
import { CreateBookIssueDto } from './dto/create-book-issue.dto';
import { BookIssue } from '../BookIssue/entites/book-issue.entity';

@Controller('book-issues')
export class BookIssueController {
  constructor(private readonly bookIssueService: BookIssueService) { }

  @Post()
  async create(@Body() createBookIssueDtos: CreateBookIssueDto[]): Promise<BookIssue[]> {
    return this.bookIssueService.create(createBookIssueDtos);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BookIssue> {
    const bookIssue = await this.bookIssueService.findOne(+id);
    if (!bookIssue) {
      throw new NotFoundException(`Book issue with ID ${id} not found`);
    }
    return bookIssue;
  }

  @Get()
  async findAll(): Promise<BookIssue[]> {
    return this.bookIssueService.findAll();
  }

  // New API to find student's library history
  @Get('/student-history/:studentId')
  async findStudentHistory(@Param('studentId') studentId: string): Promise<BookIssue[]> {
    return this.bookIssueService.findStudentHistory(+studentId);
  }

  @Patch('/return/:issueId')
  async returnBook(
    @Param('issueId') issueId: number,
    @Body('returnDate') returnDate: string
  ): Promise<BookIssue> {
    return this.bookIssueService.returnBook(issueId, returnDate);
  }

}
