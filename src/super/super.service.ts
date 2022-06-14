import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accommodation } from 'src/accommodation/entities/accommodation.entity';
import { AccommodationRepository } from 'src/accommodation/entities/accommodation.repository';
import { BusinessRepository } from 'src/business/entities/business.repository';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { RestaurantRepository } from 'src/restaurant/entities/restaurant.repository';
import { UsersRepository } from 'src/users/entities/users.repository';

@Injectable()
export class SuperService {
  constructor(
    @InjectRepository(AccommodationRepository)
    private accommodationRepository: AccommodationRepository,

    @InjectRepository(RestaurantRepository)
    private restaurantRepository: RestaurantRepository,

    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,

    @InjectRepository(BusinessRepository)
    private businessRepository: BusinessRepository
  ) { }

  public async getRestaurantProducts(page: number) {
    const list = [];
    const restaurant_count = await this.restaurantRepository.count()
    const restaurant_list: Restaurant[] = await this.restaurantRepository.find({
      take: 5,
      skip: 5 * (Number(page) - 1),
      order: {
        id: 'DESC',
      },
    })

    for (const restaurant of restaurant_list) {
      const user = await this.usersRepository.findOne({ where: { id: restaurant.admin_id } })
      const business = await this.businessRepository.findOne({ where: { id: user.business_id } })

      list.push({
        email: user.login_id,
        president: business.p_nm,
        label: restaurant.label,
        status: restaurant.status === 1 ? '진행' : '중단',
        id: restaurant.id
      })
    }
    return { count: restaurant_count, rows: list }
  }

  public async getAccommodationProducts(page: number) {
    const list = [];
    const accommotion_count = await this.accommodationRepository.count()
    const accommotion_list: Accommodation[] = await this.accommodationRepository.find({
      take: 5,
      skip: 5 * (Number(page) - 1),
      order: {
        id: 'DESC',
      },
    })

    console.log(accommotion_count)

    for (const accommodation of accommotion_list) {
      const user = await this.usersRepository.findOne({ where: { id: accommodation.admin_id } })
      const business = await this.businessRepository.findOne({ where: { id: user.business_id } })

      list.push({
        email: user.login_id,
        president: business.p_nm,
        label: accommodation.label,
        status: accommodation.status === 1 ? '진행' : '중단',
        id: accommodation.id
      })
    }
    return { count: accommotion_count, rows: list }
  }
}
