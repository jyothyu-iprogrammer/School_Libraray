import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { Author } from '../authors/enitites/author.entity';
export declare class BooksService {
    private booksRepository;
    private authorsRepository;
    constructor(booksRepository: Repository<Book>, authorsRepository: Repository<Author>);
    create(createBookDtos: CreateBookDto[]): Promise<Book[]>;
    findAll(): Promise<Book[]>;
    findByAuthorName(authorName: string): Promise<Book[]>;
}
