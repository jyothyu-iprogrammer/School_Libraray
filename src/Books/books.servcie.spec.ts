import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Author } from '../Authors/enitites/author.entity';
import { NotFoundException } from '@nestjs/common';

describe('BooksService', () => {
  let service: BooksService;
  let mockBookRepository: any;
  let mockAuthorRepository: any;

  beforeEach(async () => {
    mockBookRepository = {
      create: jest.fn().mockImplementation((book) => book), // Mock create method
      save: jest.fn(),
      find: jest.fn(),
      findByIds: jest.fn(),
      createQueryBuilder: jest.fn().mockReturnThis(), // Mock createQueryBuilder
      innerJoinAndSelect: jest.fn().mockReturnThis(), // Mock innerJoinAndSelect
      where: jest.fn().mockReturnThis(), // Mock where
      andWhere: jest.fn().mockReturnThis(), // Mock andWhere
      getMany: jest.fn(), // Mock getMany
    };

    mockAuthorRepository = {
      find: jest.fn(),
      findByIds: jest.fn(),
    };

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
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const createBookDto = {
        title: 'Test Book',
        isbn: '1234567890',
        authorIds: [1],
      };

      const mockAuthors = [{ id: 1, name: 'Author 1' }];

      mockAuthorRepository.findByIds.mockResolvedValue(mockAuthors);
      mockBookRepository.save.mockResolvedValue({ ...createBookDto, authors: mockAuthors });

      const result = await service.create([createBookDto]);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ ...createBookDto, authors: mockAuthors });
      expect(mockAuthorRepository.findByIds).toHaveBeenCalledWith(createBookDto.authorIds);
      expect(mockBookRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if authors not found', async () => {
      const createBookDto = {
        title: 'Test Book',
        isbn: '1234567890',
        authorIds: [1],
      };

      mockAuthorRepository.findByIds.mockResolvedValue([]);

      await expect(service.create([createBookDto])).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all books with authors', async () => {
      const mockBooks = [{ id: 1, title: 'Test Book', authors: [{ id: 1, name: 'Author 1' }] }];

      mockBookRepository.find.mockResolvedValue(mockBooks);

      const result = await service.findAll();

      expect(result).toEqual(mockBooks);
      expect(mockBookRepository.find).toHaveBeenCalledWith({ relations: ['authors'] });
    });
  });

  describe('getBooksByAuthor', () => {
    it('should return books by author name', async () => {
      const authorName = 'Author 1';
      const mockBooks = [
        { id: 1, title: 'Book 1', authors: [{ id: 1, name: authorName }] },
      ];
  
      mockBookRepository.createQueryBuilder.mockReturnThis(); // Ensure chaining works
      mockBookRepository.getMany.mockResolvedValue(mockBooks);
  
      const books = await service.getBooksByAuthor(authorName);
      expect(books).toEqual(mockBooks);
      expect(mockBookRepository.createQueryBuilder).toHaveBeenCalled();
      expect(mockBookRepository.getMany).toHaveBeenCalled();
    });
  
    it('should throw NotFoundException if no books found for the author', async () => {
      const authorName = 'Author 2';
      const mockAuthors = [{ id: 2, name: authorName }];
  
      mockAuthorRepository.find.mockResolvedValue(mockAuthors);
      mockBookRepository.createQueryBuilder.mockReturnThis(); // Ensure chaining works
      mockBookRepository.getMany.mockResolvedValue([]); // Simulate no books found
  
      await expect(service.getBooksByAuthor(authorName)).rejects.toThrow(NotFoundException);
      await expect(service.getBooksByAuthor(authorName)).rejects.toThrow(`No books found for the author: ${authorName}`);
    });
  
    it('should throw NotFoundException if no authors found', async () => {
      const authorName = 'Nonexistent Author';
      mockBookRepository.createQueryBuilder.mockReturnThis(); // Ensure chaining works
      mockBookRepository.getMany.mockResolvedValue([]); // Simulate no books found
  
      await expect(service.getBooksByAuthor(authorName)).rejects.toThrow(NotFoundException);
      await expect(service.getBooksByAuthor(authorName)).rejects.toThrow(`No books found for the author: ${authorName}`);
    });
  });
  
});
