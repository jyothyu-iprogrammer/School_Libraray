import { Controller, Post, Body, Get,Patch, Param, NotFoundException } from '@nestjs/common';
import { BookIssueService } from './book-issue.service';
import { CreateBookIssueDto } from './dto/create-book-issue.dto';
import { BookIssue } from '../BookIssue/entites/book-issue.entity';

@Controller('book-issues')
export class BookIssueController {
  constructor(private readonly bookIssueService: BookIssueService) { }

  @Post()
  async create(
    @Body() createBookIssueDtos: CreateBookIssueDto | CreateBookIssueDto[]
  ): Promise<BookIssue[]> {
    if (Array.isArray(createBookIssueDtos)) {
      // Handle an array of book issue requests
      const bookIssues = [];
      for (const dto of createBookIssueDtos) {
        const bookIssue = await this.bookIssueService.create(dto);
        bookIssues.push(bookIssue);
      }
      return bookIssues; // Return the array of created book issues
    } else {
      // Handle a single book issue request
      const bookIssue = await this.bookIssueService.create(createBookIssueDtos);
      return [bookIssue]; // Return an array with a single book issue
    }
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

   @Post('/return')
  async return(@Body() returnDto: { student_id: number; book_id: number }): Promise<BookIssue> {
    return this.bookIssueService.returnBook(returnDto.student_id, returnDto.book_id);
  }

}
