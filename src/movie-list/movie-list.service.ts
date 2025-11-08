import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieListService {
  findAll() {
    return `This action returns all movieList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movieList`;
  }
}
