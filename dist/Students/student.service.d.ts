import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
export declare class StudentService {
    private readonly studentRepository;
    constructor(studentRepository: Repository<Student>);
    create(createStudentDto: CreateStudentDto): Promise<Student>;
    findAll(): Promise<Student[]>;
    findOne(id: number): Promise<Student>;
    findHistory(studentId: number): Promise<Student>;
}
