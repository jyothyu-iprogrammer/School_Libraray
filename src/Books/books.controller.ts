import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Post()
    create(@Body() createBookDtos: CreateBookDto[]) {
        return this.booksService.create(createBookDtos);
    }

    @Get()
    findAll() {
        return this.booksService.findAll();
    }

    @Get('/search')
    getBooksByAuthor(@Query('authorName') authorName: string) {
        console.log('Received request to search books by author:', authorName); // Add this
        return this.booksService.getBooksByAuthor(authorName);
    }
}
