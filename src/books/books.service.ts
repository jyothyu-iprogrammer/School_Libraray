import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { Author } from '../authors/enitites/author.entity';
import { In } from 'typeorm'; // Make sure to import In


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

  // Method to find books by author name
  async findByAuthorName(authorName: string): Promise<Book[]> {
    // Step 1: Find authors matching the provided author name
    const authors = await this.authorsRepository.find({
      where: { name: authorName },
      relations: ['books'], // Load related books with the authors
    });

    // Step 2: If no authors found, return an empty array
    if (!authors || authors.length === 0) {
      throw new NotFoundException(`No authors found with the name: ${authorName}`);
    }

    // Step 3: Extract the book IDs associated with the found authors
    const bookIds = authors
      .flatMap(author => author.books)
      .map(book => book.id);

    if (bookIds.length === 0) {
      throw new NotFoundException(`No books found for the author: ${authorName}`);
    }

    // Step 4: Find and return the books by their IDs, including author relations
    const books = await this.booksRepository.find({
      where: { id: In(bookIds) },  // Use In() to pass an array of book IDs
      relations: ['authors'],
    });

    return books;
  }
}
