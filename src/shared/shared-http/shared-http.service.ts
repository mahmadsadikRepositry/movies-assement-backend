import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TMDB_BASE_URI } from '../constant/api.constant';

@Injectable()
export class SharedHttpService {
  constructor(private readonly httpService: HttpService) {}

  async get<T>(enpoint: string, params?: Record<string, any>): Promise<any> {
    try {
      const response = await this.httpService.axiosRef.get(
        `${TMDB_BASE_URI}${enpoint}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
          },
          params,
        },
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response.data.message || 'Failed to Fetch Data From TMDB',
        error.response?.status || HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
