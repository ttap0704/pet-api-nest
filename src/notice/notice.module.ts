import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeRepository } from './entities/notice.repository';
import { NoticeService } from './notice.service';

@Module({
  imports: [TypeOrmModule.forFeature([NoticeRepository])],
  providers: [NoticeService],
  exports: [NoticeService]
})
export class NoticeModule { }
