import { IsNotEmpty, IsDateString } from 'class-validator';

export class UpdateReturnDateDto {
  @IsNotEmpty()
  @IsDateString() // Validates that the string is a valid date
  returnDate: string; // Format: 'YYYY-MM-DD'
}
