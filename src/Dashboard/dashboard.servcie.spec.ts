// src/Dashboard/dashboard.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookIssue } from '../BookIssue/entites/book-issue.entity';
import { Student } from '../Students/entities/student.entity';

describe('DashboardService', () => {
    let service: DashboardService;
    const mockBookIssueRepository = {
        createQueryBuilder: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn(),
    };

    const mockStudentRepository = {};

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DashboardService,
                {
                    provide: getRepositoryToken(BookIssue),
                    useValue: mockBookIssueRepository,
                },
                {
                    provide: getRepositoryToken(Student),
                    useValue: mockStudentRepository,
                },
            ],
        }).compile();

        service = module.get<DashboardService>(DashboardService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getDashboardData', () => {
        it('should return dashboard data', async () => {
            const mockData = [
                { studentId: 1, issueCount: 2, totalFine: 5 },
                { studentId: 2, issueCount: 3, totalFine: 10 },
            ];
            mockBookIssueRepository.getRawMany.mockResolvedValue(mockData);

            const result = await service.getDashboardData();

            expect(result).toEqual([
                { studentId: 1, issueCount: 2, totalFine: 5 },
                { studentId: 2, issueCount: 3, totalFine: 10 },
            ]);
            expect(mockBookIssueRepository.getRawMany).toHaveBeenCalled();
        });
    });
});
