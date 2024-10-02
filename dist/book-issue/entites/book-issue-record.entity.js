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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookIssueRecord = void 0;
const typeorm_1 = require("typeorm");
const student_entity_1 = require("../../students/entities/student.entity");
const book_entity_1 = require("../../books/entities/book.entity");
let BookIssueRecord = class BookIssueRecord {
};
exports.BookIssueRecord = BookIssueRecord;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BookIssueRecord.prototype, "issueId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => book_entity_1.Book),
    __metadata("design:type", book_entity_1.Book)
], BookIssueRecord.prototype, "book", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student),
    __metadata("design:type", student_entity_1.Student)
], BookIssueRecord.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], BookIssueRecord.prototype, "issueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], BookIssueRecord.prototype, "returnDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], BookIssueRecord.prototype, "fine", void 0);
exports.BookIssueRecord = BookIssueRecord = __decorate([
    (0, typeorm_1.Entity)()
], BookIssueRecord);
//# sourceMappingURL=book-issue-record.entity.js.map