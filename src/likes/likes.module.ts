import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesRepository } from './entities/likes.repository';
import { LikesService } from './likes.service';

@Module({
  imports: [TypeOrmModule.forFeature([LikesRepository])],
  providers: [LikesService],
  exports: [LikesService]
})
export class LikesModule { }
