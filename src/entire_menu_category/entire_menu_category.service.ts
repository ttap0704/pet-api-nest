import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntireMenuRepository } from 'src/entire_menu/entities/entire_menu.repository';
import { RestaurantRepository } from 'src/restaurant/entities/restaurant.repository';
import { AddEntireMenuCategoryDto } from './dto/add-entire_menu_category.dto';
import { CreateEntireMenuCategoryDto } from './dto/create-entire_menu_category.dto';
import { UpdateEntireMenuCategoryDto } from './dto/update-entire_menu_category.dto';
import { EntireMenuCategoryRepository } from './entities/entire_menu_category.repository';

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
        seq: last_category_seq,
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
        menu.entire_menu_category = category
        menu.restaurant = restaurant;
        menu.seq = last_menu_seq;

        const entire_menu_res = await this.entireMenuRepository.save(menu);
        last_menu_seq++;
      }

      last_category_seq++;
    }

    return true;
  }

  public async updateEntireMenuCategoryOrder(update_data: UpdateEntireMenuCategoryDto[]) {
    let update_length = 0;
    for (const data of update_data) {
      console.log(data.id, data.seq)
      const update_res = await this.entireMenuCategoryRepository.update({ id: data.id }, { seq: data.seq })
      update_length += update_res.affected
    }

    return update_length == update_data.length ? true : false;
  }
}
