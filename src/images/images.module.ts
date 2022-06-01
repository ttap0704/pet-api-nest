import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesRepository } from './entities/images.repository';
import { ImagesService } from './images.service';

@Module({
  imports: [TypeOrmModule.forFeature([ImagesRepository])],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule { }
