import { IsNotEmpty, IsString, IsArray, IsNumber } from 'class-validator';

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    isbn: string;

    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, { each: true })
    authorIds: number[];
}
