import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BookIssueService } from './book-issue.service';
import { CreateBookIssueDto } from './dto/create-book-issue.dto';
import { BookIssue } from './entites/book-issue.entity';

@Controller('book-issues')
export class BookIssueController {
  constructor(private readonly bookIssueService: BookIssueService) {}

  @Post()
  create(@Body() createBookIssueDto: CreateBookIssueDto): Promise<BookIssue> {
    return this.bookIssueService.create(createBookIssueDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BookIssue> {
    return this.bookIssueService.findOne(+id);
  }

  @Get()
  findAll(): Promise<BookIssue[]> {
    return this.bookIssueService.findAll();
  }
}
