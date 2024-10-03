import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { Author } from '../Authors/enitites/author.entity'; // Fix typo: 'entities'

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) { }

  // Method to create a new book
  async create(createBookDtos: CreateBookDto[]): Promise<Book[]> {
    const books: Book[] = [];

    for (const createBookDto of createBookDtos) {
      const authors = await this.authorsRepository.findByIds(createBookDto.authorIds);

      // Check if authors were found
      if (!authors || authors.length === 0) {
        throw new NotFoundException(`Authors not found for the provided IDs: ${createBookDto.authorIds}`);
      }

      // Create a new book instance with associated authors
      const book = this.booksRepository.create({
        title: createBookDto.title,
        isbn: createBookDto.isbn,
        authors: authors,
      });

      books.push(await this.booksRepository.save(book)); // Save the book to the database
    }

    return books; // Return the array of created books
  }

  // Method to find all books
  async findAll(): Promise<Book[]> {
    return this.booksRepository.find({ relations: ['authors'] }); // Fetch all books with associated authors
  }

  // Method to get books by author name
  async getBooksByAuthor(authorName: string): Promise<Book[]> {
    console.log('Searching for books by author:', authorName);
  
    const books = await this.booksRepository.createQueryBuilder('book')
      .innerJoinAndSelect('book.authors', 'author') // Join authors
      .where('author.name LIKE :authorName', { authorName: `%${authorName}%` }) // Allow partial match
      .andWhere('book.deleted_at IS NULL') // Ensure the book is not soft-deleted
      .andWhere('author.deleted_at IS NULL') // Ensure the author is not soft-deleted
      .getMany();
  
    console.log('Books found:', books);
    return books; // Return the books by the specified author
  }
  
}


