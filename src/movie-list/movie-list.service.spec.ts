import { Test, TestingModule } from '@nestjs/testing';
import { MovieListService } from './movie-list.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { SharedHttpService } from '../shared/shared-http/shared-http.service';

describe('MovieListService', () => {
  let service: MovieListService;
  let sharedHttpService: SharedHttpService;

  const mockSharedHttpService: Readonly<{
    get: jest.Mock;
  }> = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieListService,
        {
          provide: SharedHttpService,
          useValue: mockSharedHttpService,
        },
      ],
    }).compile();

    service = module.get<MovieListService>(MovieListService);
    sharedHttpService = module.get<SharedHttpService>(SharedHttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllTrendingMovies', () => {
    const mockResponse = { results: [{ id: 1, title: 'Inception' }] };

    it('should return trending movies successfully', async () => {
      mockSharedHttpService.get.mockResolvedValueOnce(mockResponse);

      const result = await service.findAllTrendingMovies(1, 'week');

      expect(sharedHttpService.get).toHaveBeenCalledWith(
        '/trending/movie/week?page=1',
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw HttpException on API failure', async () => {
      const error = {
        response: {
          data: { status_message: 'Service Unavailable' },
          status: 503,
        },
      };
      (sharedHttpService.get as jest.Mock).mockRejectedValue(error);

      await expect(service.findAllTrendingMovies(1, 'day')).rejects.toThrow(
        HttpException,
      );

      await expect(
        service.findAllTrendingMovies(1, 'day'),
      ).rejects.toMatchObject({
        message: 'Service Unavailable',
        status: 503,
      });
    });

    it('should throw default HttpException if no response object', async () => {
      mockSharedHttpService.get.mockRejectedValueOnce({});

      await expect(service.findAllTrendingMovies(1, 'day')).rejects.toThrow(
        'Failed to fetch movies',
      );
    });
  });

  describe('findOne', () => {
    it('should return movie details when API call succeeds', async () => {
      const mockResponse = { id: 123, title: 'Inception' };
      (sharedHttpService.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await service.findOne(123);

      expect(sharedHttpService.get).toHaveBeenCalledWith('/movie/123');
      expect(result).toEqual(mockResponse);
    });

    it('should throw HttpException with TMDB error message on API failure', async () => {
      const error = {
        response: {
          data: { status_message: 'Movie not found' },
          status: 404,
        },
      };
      (sharedHttpService.get as jest.Mock).mockRejectedValue(error);

      await expect(service.findOne(999)).rejects.toThrow(HttpException);
      await expect(service.findOne(999)).rejects.toMatchObject({
        message: 'Movie not found',
        status: 404,
      });
    });

    it('should throw default HttpException when error has no response', async () => {
      (sharedHttpService.get as jest.Mock).mockRejectedValue({});

      await expect(service.findOne(123)).rejects.toThrow(HttpException);
      await expect(service.findOne(123)).rejects.toMatchObject({
        message: 'Failed to fetch movie',
        status: HttpStatus.BAD_GATEWAY,
      });
    });
  });
});
