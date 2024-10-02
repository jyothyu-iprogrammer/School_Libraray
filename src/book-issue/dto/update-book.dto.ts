import { IsOptional, IsDateString, IsNumber, Min } from 'class-validator';

export class UpdateBookReturnDto {
  @IsOptional()
  @IsDateString()
  return_date?: string;  // Optional: The date the book was returned

  @IsOptional()
  @IsNumber()
  @Min(0)
  fine?: number;  // Optional: Fine amount, if applicable, for late return
}
