import { Test, TestingModule } from '@nestjs/testing';
import { MovieListController } from './movie-list.controller';
import { MovieListService } from './movie-list.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('MovieListController', () => {
  let controller: MovieListController;

  const mockMovieListService = {
    findAllTrendingMovies: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieListController],
      providers: [
        {
          provide: MovieListService,
          useValue: mockMovieListService,
        },
      ],
    }).compile();

    controller = module.get<MovieListController>(MovieListController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('litsAllTrendingMovies', () => {
    it('should return trending movies list when service succeeds', async () => {
      const mockMovies = [{ id: 1, title: 'Inception' }];
      mockMovieListService.findAllTrendingMovies.mockResolvedValue(mockMovies);

      const result = await controller.litsAllTrendingMovies('week', '2');

      expect(mockMovieListService.findAllTrendingMovies).toHaveBeenCalledWith(
        2,
        'week',
      );
      expect(result).toEqual(mockMovies);
    });

    it('should default to "day" and page 1 when no params provided', async () => {
      const mockMovies = [{ id: 2, title: 'Interstellar' }];
      mockMovieListService.findAllTrendingMovies.mockResolvedValue(mockMovies);

      const result = await controller.litsAllTrendingMovies(
        undefined,
        undefined,
      );

      expect(mockMovieListService.findAllTrendingMovies).toHaveBeenCalledWith(
        1,
        'day',
      );
      expect(result).toEqual(mockMovies);
    });

    it('should throw if movieListService.findAllTrendingMovies throws', async () => {
      mockMovieListService.findAllTrendingMovies.mockRejectedValue(
        new HttpException('Failed', HttpStatus.BAD_GATEWAY),
      );

      await expect(
        controller.litsAllTrendingMovies('day', '1'),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('findOne', () => {
    it('should return movie details when valid ID is provided', async () => {
      const mockMovie = { id: 10, title: 'Tenet' };
      mockMovieListService.findOne.mockResolvedValue(mockMovie);

      const result = await controller.findOne('10');

      expect(mockMovieListService.findOne).toHaveBeenCalledWith(10);
      expect(result).toEqual(mockMovie);
    });

    it('should throw BAD_REQUEST when ID is missing', async () => {
      await expect(controller.findOne('')).rejects.toThrow(HttpException);
      await expect(controller.findOne('')).rejects.toMatchObject({
        message: 'Movie ID is required',
        status: HttpStatus.BAD_REQUEST,
      });
    });

    it('should rethrow error from findOne', async () => {
      mockMovieListService.findOne.mockRejectedValue(
        new HttpException(
          'Service unavailable',
          HttpStatus.SERVICE_UNAVAILABLE,
        ),
      );

      await expect(controller.findOne('5')).rejects.toThrow(HttpException);
      await expect(controller.findOne('5')).rejects.toMatchObject({
        message: 'Service unavailable',
        status: HttpStatus.SERVICE_UNAVAILABLE,
      });
    });

    it('should throw BAD_REQUEST when ID is not a number', async () => {
      await expect(controller.findOne('abc')).rejects.toThrow(HttpException);
      await expect(controller.findOne('abc')).rejects.toMatchObject({
        message: 'Movie ID must be a number',
        status: HttpStatus.BAD_REQUEST,
      });
    });
  });
});
