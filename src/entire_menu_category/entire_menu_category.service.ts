import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntireMenuRepository } from 'src/entire_menu/entities/entire_menu.repository';
import { RestaurantRepository } from 'src/restaurant/entities/restaurant.repository';
import { In } from 'typeorm';
import { AddEntireMenuCategoryDto } from './dto/add-entire_menu_category.dto';
import { CreateEntireMenuCategoryDto } from './dto/create-entire_menu_category.dto';
import { UpdateEntireMenuCategoryDto } from './dto/update-entire_menu_category.dto';
import { UpdateEntireMenuCategoryOrderDto } from './dto/update-entire_menu_category_order.dto';
import { EntireMenuCategory } from './entities/entire_menu_category.entity';
import { EntireMenuCategoryRepository } from './entities/entire_menu_category.repository';

interface EntireMenuCategoryList extends EntireMenuCategory {
  restaurant_label: string
}

@Injectable()
export class EntireMenuCategoryService {
  constructor(
    @InjectRepository(EntireMenuCategoryRepository)
    private entireMenuCategoryRepository: EntireMenuCategoryRepository,

    @InjectRepository(RestaurantRepository)
    private restaurantRepository: RestaurantRepository,

    @InjectRepository(EntireMenuRepository)
    private entireMenuRepository: EntireMenuRepository
  ) { }

  public async addEntireMenuCategory(restaurant_id: number, data: AddEntireMenuCategoryDto[]) {
    const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurant_id } })
    const entire_menu_data = data;
    const last_seq_category = await this.entireMenuCategoryRepository.find({
      where: { restaurant_id },
      order: {
        seq: 'DESC',
      },
      take: 1
    })
    let last_category_seq = last_seq_category[0] ? last_seq_category[0].seq : 0;
    for (const entire_menu of entire_menu_data) {
      const category_data: CreateEntireMenuCategoryDto = {
        category: entire_menu.category,
        seq: last_category_seq + 1,
        restaurant
      }

      const category = await this.entireMenuCategoryRepository.save(category_data);

      const last_seq_menu = await this.entireMenuRepository.find({
        where: { category_id: category.id },
        order: {
          seq: 'DESC',
        },
        take: 1
      })
      let last_menu_seq = last_seq_menu[0] ? last_seq_menu[0].seq : 0;

      for (const menu of entire_menu.menu) {
        menu.category = category
        menu.restaurant = restaurant;
        menu.seq = last_menu_seq + 1;

        const entire_menu_res = await this.entireMenuRepository.save(menu);
        last_menu_seq++;
      }

      last_category_seq++;
    }

    return true;
  }

  public async getAdminEntireMenuCategory(admin: number, page: string) {
    const restaurant_ids = await this.restaurantRepository.find({
      where: { admin },
      select: ['id']
    })
    const target_ids = restaurant_ids.map(item => item.id)

    const category_count = await this.entireMenuCategoryRepository.count({ where: { restaurant_id: In(target_ids) } })
    const category_list: EntireMenuCategory[] = await this.entireMenuCategoryRepository.find({
      where: {
        restaurant_id: In(target_ids)
      },
      take: 5,
      skip: 5 * (Number(page) - 1),
      order: { id: 'DESC' },
      relations: ['restaurant']
    })

    const final_category_list: EntireMenuCategoryList[] = []
    for (const category of category_list) {
      const menu = await this.entireMenuRepository.find({
        where: { category_id: category.id },
        order: { seq: 'ASC' }
      })
      final_category_list.push({ ...category, menu, restaurant_label: category.restaurant.label });
    }


    return { count: category_count, rows: final_category_list };
  }

  public async getAdminRestaurantEntireMenuCategory(restaurant_id: number) {
    return await this.entireMenuCategoryRepository.find({ where: { restaurant_id } })
  }

  public async updateEntireMenuCategoryOrder(update_data: UpdateEntireMenuCategoryOrderDto[]) {
    let update_length = 0;
    for (const data of update_data) {
      const update_res = await this.entireMenuCategoryRepository.update({ id: data.id }, { seq: data.seq })
      update_length += update_res.affected
    }

    return update_length == update_data.length ? true : false;
  }

  public async updateEntireMenuCategory(category_id: number, update_data: UpdateEntireMenuCategoryDto) {
    return await this.entireMenuCategoryRepository.update({ id: category_id }, { ...update_data })
  }

  public async deleteEntireMenuCategory(category_id: number) {
    return await this.entireMenuCategoryRepository.softDelete({ id: category_id })
  }
}
