import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/entities/users.repository';
import { BusinessRepository } from 'src/business/entities/business.repository';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ACCOMMODATION_BUSINESS_CODE_LIST, RESTAURANT_BUSINESS_CODE_LIST } from 'constant';
import { JoinCertificationRepository } from 'src/join_certification/entities/join_certification.repository';
import { generateRandom } from 'utils/tools';
import { getCertificationContents, sendEmail } from 'utils/email_tools';
import { CreateAdminAccommodationDto } from './dto/create-admin_accommodation.dto';
import { CreateAdminRestaurantDto } from './dto/create-admin_restaurant.dto';
import { AccommodationRepository } from 'src/accommodation/entities/accommodation.repository';
import { AccommodationPeakSeasonRepository } from 'src/accommodation_peak_season/entities/accommodation_peak_season.repository';
import { RoomsRepository } from 'src/rooms/entities/rooms.repository';
import { RestaurantRepository } from 'src/restaurant/entities/restaurant.repository';
import { EntireMenuRepository } from 'src/entire_menu/entities/entire_menu.repository';
import { EntireMenuCategoryRepository } from 'src/entire_menu_category/entities/entire_menu_category.repository';
import { ExposureMenuRepository } from 'src/exposure_menu/entities/exposure_menu.repository';
import { ExposureMenu } from 'src/exposure_menu/entities/exposure_menu.entity';
import { CreateEntireMenuCategoryDto } from 'src/entire_menu_category/dto/create-entire_menu_category.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,


    @InjectRepository(BusinessRepository)
    private businessRepository: BusinessRepository,

    @InjectRepository(JoinCertificationRepository)
    private joinCertificationRepository: JoinCertificationRepository,

    @InjectRepository(AccommodationRepository)
    private accommodationRepository: AccommodationRepository,

    @InjectRepository(AccommodationPeakSeasonRepository)
    private accommodationPeakSeasonRepository: AccommodationPeakSeasonRepository,

    @InjectRepository(RoomsRepository)
    private roomsRepository: RoomsRepository,

    @InjectRepository(RestaurantRepository)
    private restaurantRepository: RestaurantRepository,

    @InjectRepository(EntireMenuRepository)
    private entireMenuRepository: EntireMenuRepository,

    @InjectRepository(EntireMenuCategoryRepository)
    private entireMenuCategoryRepository: EntireMenuCategoryRepository,

    @InjectRepository(ExposureMenuRepository)
    private exposureMenuRepository: ExposureMenuRepository,
  ) { }

  public async joinAdmin(data: CreateAdminDto) {
    try {
      const { join_data, business_data } = data;

      let user_type = null;


      if (ACCOMMODATION_BUSINESS_CODE_LIST.includes(business_data.b_type)) {
        user_type = 2
      } else if (RESTAURANT_BUSINESS_CODE_LIST.includes(business_data.b_type)) {
        user_type = 1
      } else {
        // return { pass: false, message: 'Not Target' }
        user_type = 0
      }

      const check_nick = await this.usersRepository.findOne({ nickname: join_data.nickname })
      const check_login_id = await this.usersRepository.findOne({ login_id: join_data.login_id })

      if (check_nick) {
        return { pass: false, message: 'Duplicate Nickname' }
      } else if (check_login_id) {
        return { pass: false, message: 'Duplicate Email' }
      }

      const business = await this.businessRepository.createBusiness(business_data);

      join_data.business_id = business.id;
      join_data.business = business;
      join_data.type = user_type

      const user = await this.usersRepository.createUser(join_data);

      if (user && business_data) {
        const random_num = generateRandom(111111, 999999);
        const cert_res = await this.joinCertificationRepository.createJoinCertification({ cert_num: `${random_num}`, admin_id: user.id })
        const email_data = {
          to_name: join_data.name,
          to: join_data.login_id,
          subject: '[어디어디] 회원가입 이메일 인증',
          message: getCertificationContents(random_num, `http://localhost:3001/manage/join/certification/${cert_res.id}`)
        }
        await sendEmail(email_data)

        return { pass: true, user, business, cert_res };
      } else {
        return { pass: false, message: 'Error Join' };
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  public async createAccommodation(admin_id, data: CreateAdminAccommodationDto) {
    const admin = await this.usersRepository.findOne({ id: admin_id });

    const accommodation_data = data.accommodation;
    accommodation_data.admin_id = admin_id;
    accommodation_data.admin = admin;
    const accommodation = await this.accommodationRepository.save(accommodation_data);

    const rooms_data = data.rooms;
    for (const room of rooms_data) {
      room.accommodation = accommodation;
    }
    const rooms = await this.roomsRepository.createRooms(rooms_data);

    const peak_season_data = data.peak_season;
    for (const season of peak_season_data) {
      season.accommodation = accommodation;
      season.accommodation_id = accommodation.id
    }
    const seasons = await this.accommodationPeakSeasonRepository.createAccommodationPeakSeasons(peak_season_data)

    return { ...accommodation, rooms };
  }

  public async createRestaurant(admin_id, data: CreateAdminRestaurantDto) {
    const admin = await this.usersRepository.findOne({ id: admin_id });

    const restaurant_data = data.restaurant;
    restaurant_data.admin = admin;
    const restaurant = await this.restaurantRepository.save(restaurant_data);

    const exposure_menu_data = data.exposure_menu;
    const exposure_menu_arr: ExposureMenu[] = []
    for (const exposure_menu of exposure_menu_data) {
      exposure_menu.restaurant = restaurant;

      const exposure_menu_res = await this.exposureMenuRepository.save(exposure_menu);

      exposure_menu_arr.push(exposure_menu_res)
    }

    const entire_menu_data = data.entire_menu;
    for (const entire_menu of entire_menu_data) {
      const category_data: CreateEntireMenuCategoryDto = {
        category: entire_menu.category,
        seq: entire_menu.seq,
        restaurant
      }

      const category = await this.entireMenuCategoryRepository.save(category_data);

      for (const menu of entire_menu.menu) {
        menu.entire_menu_category = category
        menu.restaurant = restaurant;

        const entire_menu_res = await this.entireMenuRepository.save(menu);
      }
    }

    return { ...restaurant, exposure_menu: exposure_menu_arr };
  }
}
