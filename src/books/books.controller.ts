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
    findByAuthorName(@Query('authorName') authorName: string) {
        return this.booksService.findByAuthorName(authorName);
    }
}
