import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImagesRepository } from 'src/images/entities/images.repository';
import { UsersRepository } from 'src/users/entities/users.repository';
import { CreateDailyDto } from './dto/create-daily.dto';
import { Daily } from './entities/daily.entity';
import { DailyRepository } from './entities/daily.repository';

@Injectable()
export class DailyService {
  constructor(
    @InjectRepository(DailyRepository)
    private dailyRepository: DailyRepository,

    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,

    @InjectRepository(ImagesRepository)
    private imagesRepository: ImagesRepository
  ) { }

  public async createDaily(data: CreateDailyDto) {
    const writer = await this.usersRepository.findOne({ where: { id: data.writer_id } });

    const create_data = {
      contents: data.contents,
      writer
    }

    return await this.dailyRepository.save(create_data)
  }

  public async getDailyList(page: number) {
    const daily_list: Daily[] = await this.dailyRepository.find({
      take: 5,
      skip: 5 * (Number(page) - 1),
      order: { id: 'DESC' },
      relations: ['writer']
    })

    const final_daily_list = [];
    for (const list of daily_list) {
      final_daily_list.push({
        contents: list.contents,
        writer_id: list.writer_id,
        id: list.id,
        nickname: list.writer.nickname,
        created_at: list.created_at,
        profile_path: list.writer.profile_path,
        image_list: await this.imagesRepository.find({ where: { category: 50, target_id: list.id } })
      })
    }
    return final_daily_list;
  }

  public async getDailyDetail(id: number) {
    return await this.dailyRepository.findOne({ where: { id } })
  }
}
