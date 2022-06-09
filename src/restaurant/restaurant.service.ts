import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntireMenuRepository } from 'src/entire_menu/entities/entire_menu.repository';
import { EntireMenuCategoryRepository } from 'src/entire_menu_category/entities/entire_menu_category.repository';
import { ExposureMenuRepository } from 'src/exposure_menu/entities/exposure_menu.repository';
import { Images } from 'src/images/entities/images.entity';
import { ImagesRepository } from 'src/images/entities/images.repository';
import { In, Like } from 'typeorm';
import { UpdateRestaurantDto } from './dto/update-restaurant';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantRepository } from './entities/restaurant.repository';

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
  ) { }

  public async getRestaurantList(types: string, location: string) {
    const require = { type: types ? In(types.split(',')) : In([1, 2, 3, 4]) }

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
          category: 2,
        },
        order: { seq: 'ASC' },
        take: 1
      })
      final_restaurant_list.push({ ...restaurant, restaurant_images })
    }

    return final_restaurant_list
  }

  public async getRestaurantDetail(id: number) {
    // const restaurant: Restaurant = await this.restaurantRepository.findOne({
    //   where: { id },
    //   relations: ['restaurant_peak_season']
    // })


    // const final_restaurant: RestaurantList = { ...restaurant, restaurant_images: [] }

    // const restaurant_images = await this.imagesRepository.find({
    //   where: { target_id: restaurant.id, category: 2 },
    //   order: { seq: 'ASC' },
    //   take: 1
    // })

    // const restaurant_rooms: RoomsList[] = await this.roomsRepository.find({
    //   where: { restaurant_id: restaurant.id },
    //   order: { seq: 'ASC' }
    // })

    // for (const room of restaurant_rooms) {
    //   const rooms_images = await this.imagesRepository.find({
    //     where: { target_id: room.id, category: 21 },
    //     order: { seq: 'ASC' }
    //   })
    //   room.rooms_images = rooms_images;
    // }

    // final_restaurant.restaurant_rooms = restaurant_rooms;
    // final_restaurant.restaurant_images = restaurant_images;


    // return final_restaurant
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
