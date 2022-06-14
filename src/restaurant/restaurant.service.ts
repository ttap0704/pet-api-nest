import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntireMenuRepository } from 'src/entire_menu/entities/entire_menu.repository';
import { EntireMenuCategory } from 'src/entire_menu_category/entities/entire_menu_category.entity';
import { EntireMenuCategoryRepository } from 'src/entire_menu_category/entities/entire_menu_category.repository';
import { ExposureMenu } from 'src/exposure_menu/entities/exposure_menu.entity';
import { ExposureMenuRepository } from 'src/exposure_menu/entities/exposure_menu.repository';
import { Images } from 'src/images/entities/images.entity';
import { ImagesRepository } from 'src/images/entities/images.repository';
import { RestaurantViewsCountRepository } from 'src/restaurant_views_count/entities/restaurant_views_count.repository';
import { In, Like } from 'typeorm';
import { UpdateRestaurantDto } from './dto/update-restaurant';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantRepository } from './entities/restaurant.repository';

interface ExposureMenuList extends ExposureMenu {
  exposure_menu_image: Images
}

interface RestaurantList extends Restaurant {
  restaurant_images: Images[];
}

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(RestaurantRepository)
    private restaurantRepository: RestaurantRepository,

    @InjectRepository(ImagesRepository)
    private imagesRepository: ImagesRepository,

    @InjectRepository(EntireMenuRepository)
    private entireMenuRepository: EntireMenuRepository,

    @InjectRepository(EntireMenuCategoryRepository)
    private entireMenuCategoryRepository: EntireMenuCategoryRepository,

    @InjectRepository(ExposureMenuRepository)
    private exposureMenuRepository: ExposureMenuRepository,

    @InjectRepository(RestaurantViewsCountRepository)
    private restaurantViewsCountRepository: RestaurantViewsCountRepository
  ) { }

  public async getRestaurantList(types: string, location: string) {
    const require = { type: types ? In(types.split(',')) : In([1, 2, 3, 4]), status: 1 }

    const restaurant_list: Restaurant[] = await this.restaurantRepository.find({
      order: { id: 'DESC' },
      take: 20,
      where:
        location ? [{
          ...require,
          sido: Like(`%${location}%`),
        },
        {
          ...require,
          sigungu: Like(`%${location}%`),

        },
        {
          ...require,
          bname: Like(`%${location}%`),
        },
        {
          ...require,
          road_address: Like(`%${location}%`)
        }
        ] : [{
          ...require
        }]

    })

    const final_restaurant_list: RestaurantList[] = []

    for (const restaurant of restaurant_list) {
      const restaurant_images = await this.imagesRepository.find({
        where: {
          target_id: restaurant.id,
          category: 1,
        },
        order: { seq: 'ASC' },
        take: 1
      })
      final_restaurant_list.push({ ...restaurant, restaurant_images })
    }

    return final_restaurant_list
  }

  public async getRestaurantDetail(id: number) {
    const restaurant: Restaurant = await this.restaurantRepository.findOne({
      where: { id, status: 1 },
      relations: []
    })


    const final_restaurant: RestaurantList = { ...restaurant, restaurant_images: [] }

    const restaurant_images = await this.imagesRepository.find({
      where: { target_id: restaurant.id, category: 1 },
      order: { seq: 'ASC' },
    })

    const exposure_menu: ExposureMenu[] = await this.exposureMenuRepository.find({
      where: { restaurant_id: restaurant.id },
      order: { seq: 'ASC' }
    })

    for (const menu of exposure_menu) {
      const exposure_menu_image = await this.imagesRepository.findOne({
        where: { target_id: menu.id, category: 11 },
        order: { seq: 'ASC' }
      })
      menu.exposure_menu_image = exposure_menu_image;
    }

    const entire_menu: EntireMenuCategory[] = await this.entireMenuCategoryRepository.find({
      where: { restaurant_id: restaurant.id },
      order: { seq: 'ASC' }
    })

    for (const menu of entire_menu) {
      menu.menu = await this.entireMenuRepository.find({
        where: {
          category_id: menu.id
        },
        order: { seq: 'ASC' }
      })
    }



    final_restaurant.exposure_menu = exposure_menu;
    final_restaurant.restaurant_images = restaurant_images;
    final_restaurant.entire_menu_category = entire_menu


    return final_restaurant
  }

  public async setRestaurantViewsCount(restaurant_id: number) {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : `${new Date().getMonth() + 1}`;
    const date = new Date().getDate() < 10 ? `0${new Date().getDate()}` : `${new Date().getDate()}`;
    const check = await this.restaurantViewsCountRepository.findOne({
      where: {
        restaurant_id,
        postdate: `${year}-${month}-${date}`
      }
    })

    if (!check) {
      const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurant_id } })
      const insert_data = {
        restaurant,
        postdate: `${year}-${month}-${date}`,
        views: 1
      }
      await this.restaurantViewsCountRepository.save(insert_data)
    } else {
      const update_data = {
        views: check.views + 1
      }
      await this.restaurantViewsCountRepository.update({ id: check.id }, { ...update_data })
    }

    return true
  }

  public async getAdminRestaurant(admin: number, page: string) {
    try {
      const restaurant_count = await this.restaurantRepository.count({ where: { admin } })
      const restaurant_list: Restaurant[] = await this.restaurantRepository.find({
        where: { admin },
        take: 5,
        skip: 5 * (Number(page) - 1),
        order: {
          id: 'DESC',
        },
      })

      const final_restaurant_list: RestaurantList[] = []

      for (const restaurant of restaurant_list) {
        const restaurant_images = await this.imagesRepository.find({
          where: { target_id: restaurant.id, category: 1 },
          order: { seq: 'ASC' }
        })

        const entire_menu_category = await this.entireMenuCategoryRepository.find({
          where: { restaurant_id: restaurant.id },
          order: { seq: 'ASC' }
        })

        const exposure_menu = await this.exposureMenuRepository.find({
          where: { restaurant_id: restaurant.id },
          order: { seq: 'ASC' }
        })
        final_restaurant_list.push({ ...restaurant, restaurant_images, entire_menu_category, exposure_menu })
      }

      return { count: restaurant_count, rows: final_restaurant_list };
    } catch (err) {
      throw new Error(err)
    }
  }

  public async updateRestaurant(restaurant_id: number, update_data: UpdateRestaurantDto) {
    return await this.restaurantRepository.update({ id: restaurant_id }, { ...update_data })
  }

  public async deleteRestaurant(restaurant_id: number) {
    return await this.restaurantRepository.softDelete({ id: restaurant_id })
  }
}
