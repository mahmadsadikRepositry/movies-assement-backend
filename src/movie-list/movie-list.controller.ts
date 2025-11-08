import { Controller, Get, Param, Query } from '@nestjs/common';
import { MovieListService } from './movie-list.service';

@Controller('movie/')
export class MovieListController {
  constructor(private readonly movieListService: MovieListService) {}

  @Get(':timeWindow')
  async litsAllMovies(
    @Param('timeWindow') timeWindow?: string,
    @Query('pageNo') pageNo?: string,
  ) {
    try {
      const validTimeWindow = timeWindow === 'week' ? 'week' : 'day';
      const page = pageNo ? parseInt(pageNo, 10) : 1;
      return await this.movieListService.findAll(page, validTimeWindow);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieListService.findOne(+id);
  }
}
