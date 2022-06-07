import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantRepository } from 'src/restaurant/entities/restaurant.repository';
import { CreateExposureMenuDto } from './dto/create-exposure_menu.dto';
import { UpdateExposureMenuyDto } from './dto/update-exposure_menu.dto';
import { ExposureMenu } from './entities/exposure_menu.entity';
import { ExposureMenuRepository } from './entities/exposure_menu.repository';

@Injectable()
export class ExposureMenuService {
  constructor(
    @InjectRepository(ExposureMenuRepository)
    private exposureMenuRepository: ExposureMenuRepository,

    @InjectRepository(RestaurantRepository)
    private restaurantRepository: RestaurantRepository
  ) { }

  public async addExposureMenu(restaurant_id: number, data: CreateExposureMenuDto[]): Promise<ExposureMenu[]> {
    const exposure_menu: ExposureMenu[] = []
    const last_seq_menu = await this.exposureMenuRepository.find({
      where: { restaurant_id },
      order: {
        seq: 'DESC',
      },
      take: 1
    })

    let last_seq = last_seq_menu[0] ? last_seq_menu[0].seq : 0;
    for (const menu_data of data) {
      menu_data.restaurant = await this.restaurantRepository.findOne({ where: { id: restaurant_id } })
      menu_data.seq = last_seq + 1
      const menu = await this.exposureMenuRepository.save(menu_data);

      last_seq++;
      exposure_menu.push(menu)
    }

    return exposure_menu;
  }

  public async updateExposureMenuOrder(update_data: UpdateExposureMenuyDto[]) {
    let update_length = 0;
    for (const data of update_data) {
      const update_res = await this.exposureMenuRepository.update({ id: data.id }, { seq: data.seq })
      update_length += update_res.affected
    }

    return update_length == update_data.length ? true : false;
  }
}
