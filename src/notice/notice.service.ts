import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { NoticeRepository } from './entities/notice.repository';

@Injectable()
export class NoticeService {
  constructor(@InjectRepository(NoticeRepository)
  private noticeRepository: NoticeRepository) { }


  public async createNotice(data: CreateNoticeDto) {
    return await this.noticeRepository.save(data);
  }

  public async getNotice(target: number, page: number) {
    const target_where = isNaN(target) ? {} : {
      target
    }
    const notice_count = await this.noticeRepository.count({ where: { ...target_where } })
    const notice_list = await this.noticeRepository.find({
      where: { ...target_where },
      take: 5,
      skip: 5 * (Number(page) - 1),
      order: {
        id: 'DESC',
      },
    })


    return { count: notice_count, rows: notice_list }
  }

  public async getNoticeDetail(id: number) {
    return await this.noticeRepository.findOne({ where: { id } })
  }

  public async getLastNoticeId() {
    const last_id = await this.noticeRepository.find({ order: { id: 'DESC' }, take: 1 })

    return last_id.length > 0 ? last_id[0].id : 0
  }

  public async updateNotice(notice_id: number, update_data: UpdateNoticeDto) {
    return await this.noticeRepository.update({ id: notice_id }, { ...update_data })
  }

  public async deleteNotice(notice_id: number) {
    return await this.noticeRepository.softDelete({ id: notice_id })
  }
}
