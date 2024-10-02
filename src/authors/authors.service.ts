import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './enitites/author.entity'; // Ensure correct path
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorsRepository.create(createAuthorDto);
    return this.authorsRepository.save(author); // Automatically sets only created_at
  }

  async update(id: number, updateAuthorDto: { name: string }): Promise<Author> {
    await this.authorsRepository.update(id, { ...updateAuthorDto, updated_at: new Date() });
    return this.authorsRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Author[]> {
    return this.authorsRepository.find({ relations: ['books'] });
  }

  async findByName(name: string): Promise<Author[]> {
    return this.authorsRepository.find({ where: { name }, relations: ['books'] });
  }
}
