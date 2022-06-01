import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesRepository } from 'src/images/entities/images.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ImagesRepository])],
  providers: [UploadService],
  controllers: [UploadController]
})
export class UploadModule { }
