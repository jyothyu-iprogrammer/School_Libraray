import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './entities/book.entity';
import { Author } from '../Authors/enitites/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author])],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [TypeOrmModule], // Ensure that TypeOrmModule is exported
})
export class BooksModule {}

