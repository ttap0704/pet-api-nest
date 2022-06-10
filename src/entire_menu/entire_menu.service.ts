import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntireMenuCategoryRepository } from 'src/entire_menu_category/entities/entire_menu_category.repository';
import { RestaurantRepository } from 'src/restaurant/entities/restaurant.repository';
import { In } from 'typeorm';
import { CreateEntireMenuDto } from './dto/create-entire_menu.dto';
import { UpdateEntireMenuDto } from './dto/update-entire_menu.dto';
import { UpdateEntireMenuOrderDto } from './dto/update-entire_menu_order.dto';
import { EntireMenu } from './entities/entire_menu.entity';
import { EntireMenuRepository } from './entities/entire_menu.repository';

interface EntireMenuList extends EntireMenu {
  category_label: string,
  restaurant_label: string
}

@Injectable()
export class EntireMenuService {
  constructor(
    @InjectRepository(EntireMenuRepository)
    private entireMenuRepository: EntireMenuRepository,

    @InjectRepository(RestaurantRepository)
    private restaurantRepository: RestaurantRepository,

    @InjectRepository(EntireMenuCategoryRepository)
    private entireMenuCategoryRepository: EntireMenuCategoryRepository,
  ) { }

  public async getAdminEntireMenu(admin: number, page: string) {
    const restaurant_ids = await this.restaurantRepository.find({
      where: { admin },
      select: ['id']
    })
    const target_ids = restaurant_ids.map(item => item.id)

    const menu_count = await this.entireMenuRepository.count({ where: { restaurant_id: In(target_ids) } })
    const menu_list: EntireMenu[] = await this.entireMenuRepository.find({
      where: {
        restaurant_id: In(target_ids)
      },
      take: 5,
      skip: 5 * (Number(page) - 1),
      order: { id: 'DESC' },
      relations: ['restaurant', 'category']
    })

    const final_menu_list: EntireMenuList[] = []

    for (const menu of menu_list) {
      if (menu.category) {
        final_menu_list.push({ ...menu, restaurant_label: menu.restaurant.label, category_label: menu.category.category })
      }
    }

    return { count: menu_count, rows: final_menu_list };
  }

  public async addEntireMenu(restaurant_id: number, category_id: number, data: CreateEntireMenuDto[]) {
    const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurant_id } })
    const category = await this.entireMenuCategoryRepository.findOne({ where: { id: category_id } })
    const entire_menu_data = data;
    const last_seq_menu = await this.entireMenuRepository.find({
      where: { category_id: category.id },
      order: {
        seq: 'DESC',
      },
      take: 1
    })
    let last_menu_seq = last_seq_menu[0] ? last_seq_menu[0].seq : 0;
    for (const entire_menu of entire_menu_data) {
      entire_menu.restaurant = restaurant;
      entire_menu.category = category;
      entire_menu.seq = last_menu_seq + 1;

      const menu = this.entireMenuRepository.save(entire_menu)

      last_menu_seq++
    }

    return true;
  }

  public async updateEntireMenuOrder(update_data: UpdateEntireMenuOrderDto[]) {
    let update_length = 0;
    for (const data of update_data) {
      const update_res = await this.entireMenuRepository.update({ id: data.id }, { seq: data.seq })
      update_length += update_res.affected
    }

    return update_length == update_data.length ? true : false;
  }

  public async updateEntireMenuCategory(menu_id: number, data: { category_id: number }) {
    const category_id = data.category_id;
    const category = await this.entireMenuCategoryRepository.findOne({ where: { id: category_id } });

    return await this.entireMenuRepository.update(
      { id: menu_id },
      { category, category_id }
    )
  }

  public async updateEntireMenu(entire_menu_id: number, update_data: UpdateEntireMenuDto) {
    return await this.entireMenuRepository.update({ id: entire_menu_id }, { ...update_data })
  }

  public async deleteEntireMenu(entire_menu_id: number) {
    return await this.entireMenuRepository.softDelete({ id: entire_menu_id })
  }
}
