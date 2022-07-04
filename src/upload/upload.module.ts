import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesRepository } from 'src/images/entities/images.repository';
import { UsersRepository } from 'src/users/entities/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ImagesRepository, UsersRepository])],
  providers: [UploadService],
  controllers: [UploadController]
})
export class UploadModule { }
