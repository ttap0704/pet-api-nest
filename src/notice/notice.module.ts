import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesRepository } from 'src/images/entities/images.repository';
import { NoticeRepository } from './entities/notice.repository';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NoticeRepository, ImagesRepository])],
  providers: [NoticeService],
  exports: [NoticeService],
  controllers: [NoticeController]
})
export class NoticeModule { }
