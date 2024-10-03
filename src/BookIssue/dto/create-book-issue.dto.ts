import { IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateBookIssueDto {
  @IsNotEmpty()
  @IsNumber()
  book_id: number;

  @IsNotEmpty()
  @IsNumber()
  student_id: number;

  @IsNotEmpty()
  @IsDateString()
  issueDate: string;

  @IsOptional() // Make it optional for the creation
  returnDate?: string | null;

  @IsOptional() // Make it optional for the creation
  fine_collected?: number | null;
}
