import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service'; // Correct import path
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity'; // Correct import path
import { Author } from '../authors/enitites/author.entity'; // Correct import path
import { CreateBookDto } from './dto/create-book.dto';
import { NotFoundException } from '@nestjs/common';

describe('BooksService', () => {
    let service: BooksService;
    let bookRepository: Repository<Book>;
    let authorRepository: Repository<Author>;

    const mockBookRepository = {
        create: jest.fn().mockImplementation((book) => book), // Mock create method
        save: jest.fn(),
        find: jest.fn(),
        findByIds: jest.fn(),
    };

    const mockAuthorRepository = {
        find: jest.fn(),
        findByIds: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BooksService,
                {
                    provide: getRepositoryToken(Book),
                    useValue: mockBookRepository,
                },
                {
                    provide: getRepositoryToken(Author),
                    useValue: mockAuthorRepository,
                },
            ],
        }).compile();

        service = module.get<BooksService>(BooksService);
        bookRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
        authorRepository = module.get<Repository<Author>>(getRepositoryToken(Author));
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    describe('create', () => {
        it('should create multiple books and return them', async () => {
            const createBookDtos: CreateBookDto[] = [
                { title: 'Book 1', isbn: '123456', authorIds: [1, 2] },
                { title: 'Book 2', isbn: '654321', authorIds: [2, 3] },
            ];
            
            const mockAuthors = [
                { id: 1, name: 'Author 1' },
                { id: 2, name: 'Author 2' },
                { id: 3, name: 'Author 3' },
            ];
            
            // Mock the behavior of author repository
            mockAuthorRepository.findByIds.mockResolvedValue(mockAuthors);
            mockBookRepository.save.mockImplementation((book) => Promise.resolve(book));

            const books = await service.create(createBookDtos);
            expect(books.length).toBe(2);
            expect(mockBookRepository.save).toHaveBeenCalledTimes(2);
        });

        it('should throw NotFoundException if authors are not found', async () => {
            const createBookDtos: CreateBookDto[] = [
                { title: 'Book 1', isbn: '123456', authorIds: [1, 2] },
            ];
            
            // Mock the behavior of author repository
            mockAuthorRepository.findByIds.mockResolvedValue([]);

            await expect(service.create(createBookDtos)).rejects.toThrow(NotFoundException);
        });
    });

    describe('findAll', () => {
        it('should return an array of books with authors', async () => {
            const mockBooks = [
                { id: 1, title: 'Book 1', authors: [{ id: 1, name: 'Author 1' }] },
                { id: 2, title: 'Book 2', authors: [{ id: 2, name: 'Author 2' }] },
            ];
            
            // Mock the behavior of book repository
            mockBookRepository.find.mockResolvedValue(mockBooks);

            const books = await service.findAll();
            expect(books).toEqual(mockBooks);
        });
    });

    describe('findByAuthorName', () => {
        it('should return books by author name', async () => {
            const authorName = 'Author 1';
            const mockAuthors = [
                { id: 1, name: authorName, books: [{ id: 1 }] },
            ];
            const mockBooks = [
                { id: 1, title: 'Book 1', authors: [{ id: 1 }] },
            ];

            // Mock the behavior of the repositories
            mockAuthorRepository.find.mockResolvedValue(mockAuthors);
            mockBookRepository.find.mockResolvedValue(mockBooks);

            const books = await service.findByAuthorName(authorName);
            expect(books).toEqual(mockBooks);
        });

        it('should throw NotFoundException if no authors found', async () => {
            const authorName = 'Nonexistent Author';
            mockAuthorRepository.find.mockResolvedValue([]);

            await expect(service.findByAuthorName(authorName)).rejects.toThrow(NotFoundException);
        });

        it('should throw NotFoundException if no books found for the author', async () => {
            const authorName = 'Author 2';
            const mockAuthors = [
                { id: 2, name: authorName, books: [] },
            ];
            mockAuthorRepository.find.mockResolvedValue(mockAuthors);

            await expect(service.findByAuthorName(authorName)).rejects.toThrow(NotFoundException);
        });
    });
});
