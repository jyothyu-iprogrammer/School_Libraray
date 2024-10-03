import { Repository } from 'typeorm';
import { Author } from './enitites/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
export declare class AuthorsService {
    private authorsRepository;
    constructor(authorsRepository: Repository<Author>);
    create(createAuthorDto: CreateAuthorDto): Promise<Author>;
    findAll(): Promise<Author[]>;
    findByName(name: string): Promise<Author[]>;
}
