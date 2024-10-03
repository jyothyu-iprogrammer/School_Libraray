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
exports.BookIssueController = void 0;
const common_1 = require("@nestjs/common");
const book_issue_service_1 = require("./book-issue.service");
let BookIssueController = class BookIssueController {
    constructor(bookIssueService) {
        this.bookIssueService = bookIssueService;
    }
    async create(createBookIssueDtos) {
        return this.bookIssueService.create(createBookIssueDtos);
    }
    async findOne(id) {
        const bookIssue = await this.bookIssueService.findOne(+id);
        if (!bookIssue) {
            throw new common_1.NotFoundException(`Book issue with ID ${id} not found`);
        }
        return bookIssue;
    }
    async findAll() {
        return this.bookIssueService.findAll();
    }
    async findStudentHistory(studentId) {
        return this.bookIssueService.findStudentHistory(+studentId);
    }
    async returnBook(issueId, returnDate) {
        return this.bookIssueService.returnBook(issueId, returnDate);
    }
};
exports.BookIssueController = BookIssueController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], BookIssueController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookIssueController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookIssueController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/student-history/:studentId'),
    __param(0, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookIssueController.prototype, "findStudentHistory", null);
__decorate([
    (0, common_1.Patch)('/return/:issueId'),
    __param(0, (0, common_1.Param)('issueId')),
    __param(1, (0, common_1.Body)('returnDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], BookIssueController.prototype, "returnBook", null);
exports.BookIssueController = BookIssueController = __decorate([
    (0, common_1.Controller)('book-issues'),
    __metadata("design:paramtypes", [book_issue_service_1.BookIssueService])
], BookIssueController);
//# sourceMappingURL=book-issue.controller.js.map