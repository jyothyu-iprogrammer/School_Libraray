import { Book } from '../../books/entities/book.entity';
export declare class Author {
    id: number;
    name: string;
    books: Book[];
    created_by: number;
    updated_by: number;
    deleted_by: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
