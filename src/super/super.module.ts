import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccommodationService } from 'src/accommodation/accommodation.service';
import { AccommodationRepository } from 'src/accommodation/entities/accommodation.repository';
import { AccommodationPeakSeasonRepository } from 'src/accommodation_peak_season/entities/accommodation_peak_season.repository';
import { AccommodationViewsCountRepository } from 'src/accommodation_views_count/entities/accommodation_views_count.repository';
import { BusinessRepository } from 'src/business/entities/business.repository';
import { EntireMenuRepository } from 'src/entire_menu/entities/entire_menu.repository';
import { EntireMenuCategoryRepository } from 'src/entire_menu_category/entities/entire_menu_category.repository';
import { ExposureMenuRepository } from 'src/exposure_menu/entities/exposure_menu.repository';
import { ImagesRepository } from 'src/images/entities/images.repository';
import { JoinCertificationRepository } from 'src/join_certification/entities/join_certification.repository';
import { RestaurantRepository } from 'src/restaurant/entities/restaurant.repository';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { RestaurantViewsCountRepository } from 'src/restaurant_views_count/entities/restaurant_views_count.repository';
import { RoomsRepository } from 'src/rooms/entities/rooms.repository';
import { UsersRepository } from 'src/users/entities/users.repository';
import { SuperController } from './super.controller';
import { SuperService } from './super.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    UsersRepository,
    BusinessRepository,
    JoinCertificationRepository,
    AccommodationRepository,
    AccommodationPeakSeasonRepository,
    RoomsRepository,
    ImagesRepository,
    RestaurantRepository,
    EntireMenuRepository,
    EntireMenuCategoryRepository,
    ExposureMenuRepository,
    AccommodationViewsCountRepository,
    RestaurantViewsCountRepository,
  ])],
  controllers: [SuperController],
  providers: [SuperService, RestaurantService, AccommodationService]
})
export class SuperModule { }
