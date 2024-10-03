// src/Dashboard/dashboard.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookIssue } from '../BookIssue/entites/book-issue.entity';
import { Student } from '../Students/entities/student.entity';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(BookIssue)
        private bookIssueRepository: Repository<BookIssue>,
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
    ) {}

    // Get each student vs number of books issued and fines collected
    async getDashboardData() {
        const dashboardData = await this.bookIssueRepository
            .createQueryBuilder("bookIssue")
            .select("bookIssue.student.id", "studentId") // Access student ID correctly
            .addSelect("COUNT(bookIssue.id)", "issueCount") // Count of book issues
            .addSelect("SUM(bookIssue.fine_collected)", "totalFine") // Total fines
            .groupBy("bookIssue.student.id") // Group by student ID
            .getRawMany();

        return dashboardData;
    }
}
