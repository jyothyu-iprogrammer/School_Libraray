import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity'; // Make sure the path is correct
import { StudentService } from './student.service'; 
import { StudentController } from './student.controller';
import { BookIssue } from '../BookIssue/entites/book-issue.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [StudentService, BookIssue],
  controllers: [StudentController],
  exports: [TypeOrmModule], // Export TypeOrmModule to allow other modules to use StudentRepository
})
export class StudentModule {}
