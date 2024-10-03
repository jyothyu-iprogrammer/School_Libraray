"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const authors_module_1 = require("./Authors/authors.module");
const books_module_1 = require("./Books/books.module");
const book_issue_module_1 = require("./BookIssue/book-issue.module");
const student_module_1 = require("./Students/student.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: '65.1.205.67',
                port: 3306,
                username: 'root',
                password: '0FZWSK7C#9',
                database: 'school_library_db',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
                logging: true,
                logger: 'advanced-console'
            }),
            authors_module_1.AuthorsModule,
            books_module_1.BooksModule,
            book_issue_module_1.BookIssueModule,
            student_module_1.StudentModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map