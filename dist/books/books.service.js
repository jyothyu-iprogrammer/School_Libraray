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
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const book_entity_1 = require("./entities/book.entity");
const author_entity_1 = require("../authors/enitites/author.entity");
const typeorm_3 = require("typeorm");
let BooksService = class BooksService {
    constructor(booksRepository, authorsRepository) {
        this.booksRepository = booksRepository;
        this.authorsRepository = authorsRepository;
    }
    async create(createBookDtos) {
        const books = [];
        for (const createBookDto of createBookDtos) {
            const authors = await this.authorsRepository.findByIds(createBookDto.authorIds);
            if (!authors || authors.length === 0) {
                throw new common_1.NotFoundException(`Authors not found for the provided IDs: ${createBookDto.authorIds}`);
            }
            const book = this.booksRepository.create({
                title: createBookDto.title,
                isbn: createBookDto.isbn,
                authors: authors,
            });
            books.push(await this.booksRepository.save(book));
        }
        return books;
    }
    async findAll() {
        return this.booksRepository.find({ relations: ['authors'] });
    }
    async findByAuthorName(authorName) {
        const authors = await this.authorsRepository.find({
            where: { name: authorName },
            relations: ['books'],
        });
        if (!authors || authors.length === 0) {
            throw new common_1.NotFoundException(`No authors found with the name: ${authorName}`);
        }
        const bookIds = authors
            .flatMap(author => author.books)
            .map(book => book.id);
        if (bookIds.length === 0) {
            throw new common_1.NotFoundException(`No books found for the author: ${authorName}`);
        }
        const books = await this.booksRepository.find({
            where: { id: (0, typeorm_3.In)(bookIds) },
            relations: ['authors'],
        });
        return books;
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __param(1, (0, typeorm_1.InjectRepository)(author_entity_1.Author)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BooksService);
//# sourceMappingURL=books.service.js.map