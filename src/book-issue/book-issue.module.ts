import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookIssue } from './entites/book-issue.entity';
import { BookIssueService } from './book-issue.service';
import { BookIssueController } from './book-issue.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BookIssue])],
  providers: [BookIssueService],
  controllers: [BookIssueController],
})
export class BookIssueModule {}
