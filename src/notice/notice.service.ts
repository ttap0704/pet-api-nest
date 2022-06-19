import * as fs from 'fs';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UPLOAD_PATH_ENG } from 'constant';
import { ImagesRepository } from 'src/images/entities/images.repository';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { NoticeRepository } from './entities/notice.repository';
import { In } from 'typeorm';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(NoticeRepository)
    private noticeRepository: NoticeRepository,

    @InjectRepository(ImagesRepository)
    private imagesRepository: ImagesRepository,
  ) { }


  public async createNotice(data: CreateNoticeDto) {
    return await this.noticeRepository.save(data);
  }

  public async getNotice(target: string, page: number, is_super?: boolean) {
    const target_where = target ? { target: In(target.split(',')) } : {}

    const status_where = is_super ? {} : {
      status: 1
    }

    const take = is_super ? 5 : 10

    const notice_count = await this.noticeRepository.count({ where: { ...target_where, ...status_where } })
    const notice_list = await this.noticeRepository.find({
      where: { ...target_where },
      take,
      skip: take * (Number(page) - 1),
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
    const images = await this.imagesRepository.find({ category: 100, target_id: notice_id })
    const type_path = 'notice';
    const target_path = Math.floor(Number(notice_id) / 50) * 50
    if (images.length > 0) {
      for (const image of images) {
        await fs.unlink(`${__dirname}/../../../image/${type_path}/${target_path}/${image.file_name}`, (err) => {
          console.log(err);
        })
      }

      await this.imagesRepository.delete({ category: 100, target_id: notice_id })
    }

    return await this.noticeRepository.delete({ id: notice_id })
  }
}
