import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export class CreateBookIssueDto {
  @IsNotEmpty()
  @IsNumber()
  bookId: number; // Foreign Key to Book

  @IsNotEmpty()
  @IsNumber()
  studentId: number; // Foreign Key to Student

  @IsNotEmpty()
  @IsDate()
  issueDate: Date; // The date the book is issued

}
