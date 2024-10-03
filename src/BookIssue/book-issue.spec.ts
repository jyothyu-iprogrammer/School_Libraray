import { Test, TestingModule } from '@nestjs/testing';
import { BookIssueController } from './book-issue.controller';
import { BookIssueService } from './book-issue.service';
import { BookIssue } from './entites/book-issue.entity';
import { BadRequestException } from '@nestjs/common';

describe('BookIssueController', () => {
  let controller: BookIssueController;
  let service: BookIssueService;

  const mockBookIssueService = {
    create: jest.fn(),
    findStudentHistory: jest.fn().mockResolvedValue([
      {
        id: 1,
        issueDate: new Date('2024-10-01T00:00:00.000Z'),
        returnDate: null,
        fine_collected: null,
        created_by: null,
        updated_by: null,
        deleted_by: null,
        created_at: new Date('2024-10-03T02:58:20.627Z'),
        updated_at: null,
        deleted_at: null,
        book: {
          id: 1,
          title: "Harry Potter and the Sorcerer's Stone",
          isbn: "978-0439708180",
          created_by: null,
          updated_by: null,
          deleted_by: null,
          created_at: new Date('2024-10-02T12:26:25.443Z'),
          updated_at: null,
          deleted_at: null
        },
        student: {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          rollNo: "R001",
          class_level: "class 10",
          created_at: new Date('2024-10-03T01:05:55.152Z'),
          updated_at: null,
          deleted_at: null
        }
      }
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookIssueController],
      providers: [
        {
          provide: BookIssueService,
          useValue: mockBookIssueService,
        },
      ],
    }).compile();

    controller = module.get<BookIssueController>(BookIssueController);
    service = module.get<BookIssueService>(BookIssueService);
  });

  describe('create', () => {
    it('should create book issues successfully', async () => {
      const payload = [
        {
          book_id: 2,
          student_id: 1, // John Doe
          issueDate: "2024-10-01",
          returnDate: null,
          fine_collected: null
        }
      ];

      // Mock the service response to return the newly created book issue
      mockBookIssueService.create.mockResolvedValue([
        {
          id: 2,
          issueDate: new Date('2024-10-01T00:00:00.000Z'),
          returnDate: null,
          fine_collected: null,
          created_by: null,
          updated_by: null,
          deleted_by: null,
          created_at: new Date('2024-10-03T02:58:20.627Z'),
          updated_at: null,
          deleted_at: null,
          book: { id: 2 }, // Mocking the book entity
          student: { id: 1 } // Mocking the student entity
        }
      ]);

      const result = await controller.create(payload);
      expect(result).toEqual([
        {
          id: 2,
          issueDate: new Date('2024-10-01T00:00:00.000Z'),
          returnDate: null,
          fine_collected: null,
          created_by: null,
          updated_by: null,
          deleted_by: null,
          created_at: new Date('2024-10-03T02:58:20.627Z'),
          updated_at: null,
          deleted_at: null,
          book: { id: 2 },
          student: { id: 1 }
        }
      ]);
      expect(service.create).toHaveBeenCalledWith(payload);
    });

    it('should throw a BadRequestException if the student already has an issued book', async () => {
      const payload = [
        {
          book_id: 2,
          student_id: 1, // John Doe
          issueDate: "2024-10-01",
          returnDate: null,
          fine_collected: null
        }
      ];

      // Simulate existing book issue for student
      mockBookIssueService.create.mockRejectedValue(new BadRequestException("A student can only issue one book at a time."));

      await expect(controller.create(payload)).rejects.toThrow(BadRequestException);
      await expect(controller.create(payload)).rejects.toThrow("A student can only issue one book at a time.");
      expect(service.create).toHaveBeenCalledWith(payload);
    });
  });

  describe('findStudentHistory', () => {
    it('should return an array of book issues for a student', async () => {
      const studentId = '1'; // Change this to a string
      const result = await controller.findStudentHistory(studentId); // Pass as a string
      expect(result).toEqual([
        {
          id: 1,
          issueDate: new Date('2024-10-01T00:00:00.000Z'),
          returnDate: null,
          fine_collected: null,
          created_by: null,
          updated_by: null,
          deleted_by: null,
          created_at: new Date('2024-10-03T02:58:20.627Z'),
          updated_at: null,
          deleted_at: null,
          book: {
            id: 1,
            title: "Harry Potter and the Sorcerer's Stone",
            isbn: "978-0439708180",
            created_by: null,
            updated_by: null,
            deleted_by: null,
            created_at: new Date('2024-10-02T12:26:25.443Z'),
            updated_at: null,
            deleted_at: null
          },
          student: {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            rollNo: "R001",
            class_level: "class 10",
            created_at: new Date('2024-10-03T01:05:55.152Z'),
            updated_at: null,
            deleted_at: null
          }
        }
      ]);
      expect(service.findStudentHistory).toHaveBeenCalledWith(+studentId); // Pass as a number when calling the service
    });
  });
});
