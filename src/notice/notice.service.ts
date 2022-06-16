import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { NoticeRepository } from './entities/notice.repository';

@Injectable()
export class NoticeService {
  constructor(@InjectRepository(NoticeRepository)
  private noticeRepository: NoticeRepository) { }


  public async createNotice(data: CreateNoticeDto) {
    return await this.noticeRepository.save(data);
  }

  public async getNoticeDetail(id: number) {
    return await this.noticeRepository.findOne({ where: { id } })
  }

  public async getLastNoticeId() {
    const last_id = await this.noticeRepository.find({ order: { id: 'DESC' }, take: 1 })

    return last_id.length > 0 ? last_id[0].id : 0
  }
}
