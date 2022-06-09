import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntireMenuRepository } from 'src/entire_menu/entities/entire_menu.repository';
import { Images } from 'src/images/entities/images.entity';
import { ImagesRepository } from 'src/images/entities/images.repository';
import { RestaurantRepository } from 'src/restaurant/entities/restaurant.repository';
import { In } from 'typeorm';
import { CreateExposureMenuDto } from './dto/create-exposure_menu.dto';
import { UpdateExposureMenuDto } from './dto/update-exposure_menu.dto';
import { ExposureMenu } from './entities/exposure_menu.entity';
import { ExposureMenuRepository } from './entities/exposure_menu.repository';

interface ExposureMenuList extends ExposureMenu {
  exposure_menu_image: Images,
  restaurant_label: string
}

@Injectable()
export class ExposureMenuService {
  constructor(
    @InjectRepository(ExposureMenuRepository)
    private exposureMenuRepository: ExposureMenuRepository,

    @InjectRepository(RestaurantRepository)
    private restaurantRepository: RestaurantRepository,

    @InjectRepository(ImagesRepository)
    private imagesRepository: ImagesRepository
  ) { }

  public async getAdminExposureMenu(admin: number, page: string) {
    const restaurant_ids = await this.restaurantRepository.find({
      where: { admin },
      select: ['id']
    })
    const target_ids = restaurant_ids.map(item => item.id)

    const menu_count = await this.exposureMenuRepository.count({ where: { restaurant_id: In(target_ids) } })
    const menu_list: ExposureMenu[] = await this.exposureMenuRepository.find({
      where: {
        restaurant_id: In(target_ids)
      },
      take: 5,
      skip: 5 * (Number(page) - 1),
      order: { id: 'DESC' },
      relations: ['restaurant']
    })

    const final_menu_list: ExposureMenuList[] = []

    for (const menu of menu_list) {
      const exposure_menu_image = await this.imagesRepository.findOne({
        where: { target_id: menu.id, category: 11 },
        order: { seq: 'ASC' }
      })
      final_menu_list.push({ ...menu, exposure_menu_image, restaurant_label: menu.restaurant.label })
    }

    return { count: menu_count, rows: final_menu_list };
  }


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

  public async updateExposureMenuOrder(update_data: UpdateExposureMenuDto[]) {
    let update_length = 0;
    for (const data of update_data) {
      const update_res = await this.exposureMenuRepository.update({ id: data.id }, { seq: data.seq })
      update_length += update_res.affected
    }

    return update_length == update_data.length ? true : false;
  }

  public async updateExposureMenu(exposure_menu_id: number, update_data: UpdateExposureMenuDto) {
    console.log(typeof exposure_menu_id)
    return await this.exposureMenuRepository.update({ id: exposure_menu_id }, { ...update_data })
  }
}
