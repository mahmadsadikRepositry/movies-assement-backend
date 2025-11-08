import { Module } from '@nestjs/common';
import { MovieListService } from './movie-list.service';
import { MovieListController } from './movie-list.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [MovieListController],
  providers: [MovieListService],
})
export class MovieListModule {}
