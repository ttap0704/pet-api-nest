import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accommodation } from 'src/accommodation/entities/accommodation.entity';
import { AccommodationRepository } from 'src/accommodation/entities/accommodation.repository';
import { BusinessRepository } from 'src/business/entities/business.repository';
import { Report } from 'src/report/entities/report.entity';
import { ReportRepository } from 'src/report/entities/report.repository';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { RestaurantRepository } from 'src/restaurant/entities/restaurant.repository';
import { LoginUsersDto } from 'src/users/dto/login-users.dto';
import { Users } from 'src/users/entities/users.entity';
import { UsersRepository } from 'src/users/entities/users.repository';
import { Not } from 'typeorm';
import { isHashValid } from 'utils/bcrypt';
import { REPORT_REASONS } from '../../constant'

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
    private businessRepository: BusinessRepository,

    @InjectRepository(ReportRepository)
    private reportRepository: ReportRepository
  ) { }

  public async loginSuper(data: LoginUsersDto) {
    const { login_id, password } = data;

    if (login_id.length == 0 || password?.length == 0 || password == null) {
      return { pass: false, message: 'Empty Data' }
    }

    const user = await this.usersRepository.findOne({ login_id });
    if (user) {
      if (user.certification == 0) {
        return { pass: false, message: 'Before Certification' }
      }

      const validation = await isHashValid(password, user.password)
      if (user.type == 0) {
        if (validation) {
          return { pass: true, user }
        } else {
          return { pass: false, message: 'Wrong Password' }
        }
      } else {
        return { pass: false, message: 'Not Super' }
      }

    } else {
      return { pass: false, message: 'Wrong Email' }
    }
  }

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

  public async getAllUsers(page: number) {
    const list = [];
    const users_count = await this.usersRepository.count({ where: { type: Not(0) } })
    const users_list: Users[] = await this.usersRepository.find({
      where: {
        type: Not(0),
      },
      take: 5,
      skip: 5 * (Number(page) - 1),
      order: {
        id: 'DESC',
      },
    })

    for (const user of users_list) {
      let type = '';
      if (user.type == 1) {
        type = '음식점 관리자';
      } else if (user.type == 2) {
        type = '숙박업소 관리자'
      } else {
        type = '일반 유저'
      }

      list.push({
        id: user.id,
        email: user.login_id,
        type,
        phone: user.phone ?? '-',
        warning: `${user.warning}회`,
        created_at: user.created_at
      })
    }
    return { count: users_count, rows: list }
  }

  public async getReports(page: number, category?: number) {
    const list = [];
    const reports_count = await this.reportRepository.count()
    const reports_list: Report[] = await this.reportRepository.find({
      take: 5,
      skip: 5 * (Number(page) - 1),
      order: {
        id: 'DESC',
      },
    })

    for (const report of reports_list) {
      const reason = REPORT_REASONS[report.reason - 1];

      list.push({
        id: report.id,
        reason,
        created_at: report.created_at
      })
    }
    return { count: reports_count, rows: list }
  }
}
