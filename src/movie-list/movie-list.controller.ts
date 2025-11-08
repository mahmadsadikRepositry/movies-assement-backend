import { Controller, Get, Param } from '@nestjs/common';
import { MovieListService } from './movie-list.service';

@Controller('movie-list')
export class MovieListController {
  constructor(private readonly movieListService: MovieListService) {}

  @Get()
  findAll() {
    return this.movieListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieListService.findOne(+id);
  }
  
}
