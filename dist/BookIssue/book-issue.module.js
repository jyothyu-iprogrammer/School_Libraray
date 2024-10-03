"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookIssueModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const book_issue_service_1 = require("./book-issue.service");
const book_issue_controller_1 = require("./book-issue.controller");
const book_issue_entity_1 = require("./entites/book-issue.entity");
const books_module_1 = require("../Books/books.module");
const student_module_1 = require("../Students/student.module");
let BookIssueModule = class BookIssueModule {
};
exports.BookIssueModule = BookIssueModule;
exports.BookIssueModule = BookIssueModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([book_issue_entity_1.BookIssue]),
            books_module_1.BooksModule,
            student_module_1.StudentModule,
        ],
        providers: [book_issue_service_1.BookIssueService],
        controllers: [book_issue_controller_1.BookIssueController],
    })
], BookIssueModule);
//# sourceMappingURL=book-issue.module.js.map