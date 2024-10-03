"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookIssueService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const book_issue_entity_1 = require("../BookIssue/entites/book-issue.entity");
const book_entity_1 = require("../Books/entities/book.entity");
const student_entity_1 = require("../Students/entities/student.entity");
let BookIssueService = class BookIssueService {
    constructor(bookIssueRepository, bookRepository, studentRepository) {
        this.bookIssueRepository = bookIssueRepository;
        this.bookRepository = bookRepository;
        this.studentRepository = studentRepository;
    }
    async create(createBookIssueDto) {
        return await this.bookIssueRepository.manager.transaction(async (entityManager) => {
            const activeIssue = await entityManager.findOne(book_issue_entity_1.BookIssue, {
                where: {
                    student: { id: createBookIssueDto.student_id },
                    returnDate: null,
                },
            });
            if (activeIssue) {
                throw new common_1.BadRequestException('A student can only issue one book at a time until the previous book is returned.');
            }
            const newBookIssue = entityManager.create(book_issue_entity_1.BookIssue, Object.assign(Object.assign({}, createBookIssueDto), { issueDate: new Date(), returnDate: null, book: { id: createBookIssueDto.book_id }, student: { id: createBookIssueDto.student_id } }));
            return await entityManager.save(newBookIssue);
        });
    }
    async returnBook(studentId, bookId) {
        return await this.bookIssueRepository.manager.transaction(async (entityManager) => {
            const existingIssue = await entityManager.findOne(book_issue_entity_1.BookIssue, {
                where: {
                    student: { id: studentId },
                    book: { id: bookId },
                    returnDate: null,
                },
            });
            if (!existingIssue) {
                throw new common_1.NotFoundException("No active book issue found for the student.");
            }
            existingIssue.returnDate = new Date();
            return await entityManager.save(existingIssue);
        });
    }
    async findOne(id) {
        const bookIssue = await this.bookIssueRepository.findOne({
            where: { id },
            relations: ['book', 'student'],
        });
        if (!bookIssue) {
            throw new common_1.NotFoundException(`Book issue with ID ${id} not found`);
        }
        return bookIssue;
    }
    async findAll() {
        return this.bookIssueRepository.find({ relations: ['book', 'student'] });
    }
    async findStudentHistory(studentId) {
        return this.bookIssueRepository.find({
            where: { student: { id: studentId } },
            relations: ['book', 'student'],
        });
    }
};
exports.BookIssueService = BookIssueService;
exports.BookIssueService = BookIssueService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(book_issue_entity_1.BookIssue)),
    __param(1, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __param(2, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BookIssueService);
//# sourceMappingURL=book-issue.service.js.map