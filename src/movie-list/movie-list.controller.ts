import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { MovieListService } from './movie-list.service';

@Controller('api/movie/')
export class MovieListController {
  constructor(private readonly movieListService: MovieListService) {}

  @Get('trending/:timeWindow')
  async litsAllTrendingMovies(
    @Param('timeWindow') timeWindow?: string,
    @Query('pageNo') pageNo?: string,
  ) {
    try {
      const validTimeWindow = timeWindow === 'week' ? 'week' : 'day';
      const page = pageNo ? parseInt(pageNo, 10) : 1;
      return await this.movieListService.findAllTrendingMovies(
        page,
        validTimeWindow,
      );
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    //Ensure Id is provided
    if (!id) {
      throw new HttpException('Movie ID is required', HttpStatus.BAD_REQUEST);
    }
    const movieId = parseInt(id, 10);

    if (isNaN(movieId)) {
      throw new HttpException(
        'Movie ID must be a number',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const movie = await this.movieListService.findOne(+id);
      return movie;
    } catch (error) {
      throw error;
    }
  }
}
