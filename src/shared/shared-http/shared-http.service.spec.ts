import { Test, TestingModule } from '@nestjs/testing';
import { SharedHttpService } from './shared-http.service';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus } from '@nestjs/common';
import { TMDB_BASE_URI } from '../constant/api.constant';

describe('SharedHttpService', () => {
  let service: SharedHttpService;
  let httpService: HttpService;

  const mockAxiosRef = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SharedHttpService,
        {
          provide: HttpService,
          useValue: { axiosRef: mockAxiosRef },
        },
      ],
    }).compile();

    service = module.get<SharedHttpService>(SharedHttpService);
    httpService = module.get<HttpService>(HttpService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    const endpoint = '/movie/popular';
    const mockParams = { page: 2 };
    const mockData = { results: [{ id: 1, title: 'Inception' }] };

    it('should fetch data successfully', async () => {
      mockAxiosRef.get.mockResolvedValueOnce({ data: mockData });

      const result = await service.get(endpoint, mockParams);

      expect(mockAxiosRef.get).toHaveBeenCalledWith(
        `${TMDB_BASE_URI}${endpoint}`,
        expect.objectContaining({
          headers: {
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
          },
          params: mockParams,
        }),
      );

      expect(result).toEqual(mockData);
    });

    it('should throw HttpException when API call fails with response', async () => {
      mockAxiosRef.get.mockRejectedValueOnce({
        response: {
          data: { message: 'Not Found' },
          status: 404,
        },
      });

      await expect(service.get(endpoint)).rejects.toThrow(HttpException);
      await expect(service.get(endpoint)).rejects.toMatchObject({
        message: 'Failed to Fetch Data From TMDB',
        status: 502,
      });
    });

    it('should throw default HttpException when no response is available', async () => {
      mockAxiosRef.get.mockRejectedValueOnce({});

      await expect(service.get(endpoint)).rejects.toThrow(HttpException);
      await expect(service.get(endpoint)).rejects.toMatchObject({
        message: 'Failed to Fetch Data From TMDB',
        status: HttpStatus.BAD_GATEWAY,
      });
    });
  });
});
