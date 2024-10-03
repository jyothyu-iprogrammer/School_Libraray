import { Controller, Get, Post, Body, Query, Param, Patch } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get('/search')
  findByName(@Query('name') name: string) {
    return this.authorsService.findByName(name);
  }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateAuthorDto: CreateAuthorDto) {
  //   return this.authorsService.update(id, updateAuthorDto);
  // }
}
