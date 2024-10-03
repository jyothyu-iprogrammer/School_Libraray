import { Author } from '../../Authors/enitites/author.entity';
export declare class Book {
    id: number;
    title: string;
    isbn: string;
    authors: Author[];
    created_by: number;
    updated_by: number;
    deleted_by: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
