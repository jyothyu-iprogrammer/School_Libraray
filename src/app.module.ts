import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { BookIssueModule } from './book-issue/book-issue.module';
import { StudentModule } from './students/student.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
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
    AuthorsModule,
    BooksModule,
    BookIssueModule,
    StudentModule,
  ],
})
export class AppModule { }
