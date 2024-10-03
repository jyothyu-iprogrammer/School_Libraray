import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookIssueService } from './book-issue.service';
import { BookIssueController } from './book-issue.controller';
import { BookIssue } from './entites/book-issue.entity';
import { BooksModule } from '../Books/books.module'; 
import { StudentModule } from '../Students/student.module'; // Ensure this is imported

@Module({
  imports: [
    TypeOrmModule.forFeature([BookIssue]), 
    BooksModule, // Ensure this is imported
    StudentModule, // Ensure this is imported
  ],
  providers: [BookIssueService],
  controllers: [BookIssueController],
})
export class BookIssueModule {}
