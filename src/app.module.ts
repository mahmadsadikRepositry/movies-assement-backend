import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MovieListModule } from './movie-list/movie-list.module';

@Module({
  imports: [ConfigModule.forRoot(), MovieListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
