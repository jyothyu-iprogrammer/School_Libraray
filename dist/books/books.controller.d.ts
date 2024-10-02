import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
export declare class BooksController {
    private booksService;
    constructor(booksService: BooksService);
    create(createBookDtos: CreateBookDto[]): Promise<import("./entities/book.entity").Book[]>;
    findAll(): Promise<import("./entities/book.entity").Book[]>;
    findByAuthorName(authorName: string): Promise<import("./entities/book.entity").Book[]>;
}
