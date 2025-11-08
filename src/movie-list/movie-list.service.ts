import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SharedHttpService } from 'src/shared/shared-http/shared-http.service';

@Injectable()
export class MovieListService {
  constructor(private readonly sharedHttpService: SharedHttpService) {}

  async findAll(page_number: number, time_window: string) {
    try {
      const enpoint = `/trending/movie/${time_window}?page=${page_number}`;
      let result = await this.sharedHttpService.get(enpoint);
      return result;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.status_message || 'Failed to fetch movies',
        error.response?.status || HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async findOne(id: number) {
    try {
      const enpoint = `/movie/${id}`;
      let result = await this.sharedHttpService.get(enpoint);
      return result;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.status_message || 'Failed to fetch movie',
        error.response?.status || HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
