// src/Dashboard/dashboard.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { BookIssue } from '../BookIssue/entites/book-issue.entity';
import { Student } from '../Students/entities/student.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BookIssue, Student])],
    providers: [DashboardService],
    controllers: [DashboardController],
})
export class DashboardModule {}
