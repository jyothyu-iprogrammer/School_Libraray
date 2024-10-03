import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(): Promise<Author[]> {
    return this.authorsRepository.find({ relations: ['books'] });
  }

  async findByName(name: string): Promise<Author[]> {
    return this.authorsRepository.find({ where: { name }, relations: ['books'] });
  }

  // async update(id: number, name: string): Promise<Author> {
  //   const result = await this.authorsRepository.update(id, { name, updated_at: new Date() });
  //   if (result.affected === 0) {
  //     throw new NotFoundException(`Author not found with id: ${id}`);
  //   }
  //   return this.authorsRepository.findOne({ where: { id } });
  // }
}
