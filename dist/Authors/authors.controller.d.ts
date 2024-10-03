import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
export declare class AuthorsController {
    private authorsService;
    constructor(authorsService: AuthorsService);
    create(createAuthorDto: CreateAuthorDto): Promise<import("./enitites/author.entity").Author>;
    findAll(): Promise<import("./enitites/author.entity").Author[]>;
    findByName(name: string): Promise<import("./enitites/author.entity").Author[]>;
}
