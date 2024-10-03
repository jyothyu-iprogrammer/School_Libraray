import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service'; // Correct import path
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './enitites/author.entity'; // Correct import path
import { CreateAuthorDto } from './dto/create-author.dto';
import { NotFoundException } from '@nestjs/common';

describe('AuthorsService', () => {
    let service: AuthorsService;
    let authorsRepository: Repository<Author>;

    const mockAuthorsRepository = {
        create: jest.fn().mockImplementation((author) => author), // Mock create method
        save: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthorsService,
                {
                    provide: getRepositoryToken(Author),
                    useValue: mockAuthorsRepository,
                },
            ],
        }).compile();

        service = module.get<AuthorsService>(AuthorsService);
        authorsRepository = module.get<Repository<Author>>(getRepositoryToken(Author));
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    describe('create', () => {
        it('should create a new author and return it', async () => {
            const createAuthorDto: CreateAuthorDto = { name: 'Author 1' };
            const mockAuthor = { id: 1, ...createAuthorDto };

            // Mock the behavior of the save method
            mockAuthorsRepository.save.mockResolvedValue(mockAuthor);
            mockAuthorsRepository.create.mockReturnValue(mockAuthor); // Mock create method

            const author = await service.create(createAuthorDto);
            expect(author).toEqual(mockAuthor);
            expect(mockAuthorsRepository.save).toHaveBeenCalledWith(mockAuthor);
        });
    });

    describe('update', () => {
        it('should throw NotFoundException if the author does not exist', async () => {
            const authorId = 999; // Nonexistent ID
            const updateAuthorDto = { name: 'Nonexistent Author' };
    
            // Mock the behavior of the update method to do nothing
            mockAuthorsRepository.update.mockResolvedValue(undefined); // Simulate successful update
            mockAuthorsRepository.findOne.mockResolvedValue(null); // Simulate that the author was not found
    
            await expect(service.update(authorId, updateAuthorDto)).rejects.toThrow(NotFoundException);
            await expect(service.update(authorId, updateAuthorDto)).rejects.toThrow(`Author not found with id: ${authorId}`); // Check the specific message
        });
    });
    

    describe('findAll', () => {
        it('should return an array of authors with books', async () => {
            const mockAuthors = [
                { id: 1, name: 'Author 1', books: [] },
                { id: 2, name: 'Author 2', books: [] },
            ];

            // Mock the behavior of the find method
            mockAuthorsRepository.find.mockResolvedValue(mockAuthors);

            const authors = await service.findAll();
            expect(authors).toEqual(mockAuthors);
            expect(mockAuthorsRepository.find).toHaveBeenCalledWith({ relations: ['books'] });
        });
    });

    describe('findByName', () => {
        it('should return authors by name', async () => {
            const authorName = 'Author 1';
            const mockAuthors = [
                { id: 1, name: authorName, books: [] },
            ];

            // Mock the behavior of the find method
            mockAuthorsRepository.find.mockResolvedValue(mockAuthors);

            const authors = await service.findByName(authorName);
            expect(authors).toEqual(mockAuthors);
            expect(mockAuthorsRepository.find).toHaveBeenCalledWith({ where: { name: authorName }, relations: ['books'] });
        });

        it('should return an empty array if no authors found', async () => {
            const authorName = 'Nonexistent Author';
            mockAuthorsRepository.find.mockResolvedValue([]);

            const authors = await service.findByName(authorName);
            expect(authors).toEqual([]);
            expect(mockAuthorsRepository.find).toHaveBeenCalledWith({ where: { name: authorName }, relations: ['books'] });
        });
    });
});

