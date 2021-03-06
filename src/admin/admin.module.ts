import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccommodationService } from 'src/accommodation/accommodation.service';
import { AccommodationRepository } from 'src/accommodation/entities/accommodation.repository';
import { AccommodationPeakSeasonService } from 'src/accommodation_peak_season/accommodation_peak_season.service';
import { AccommodationPeakSeasonRepository } from 'src/accommodation_peak_season/entities/accommodation_peak_season.repository';
import { BusinessRepository } from 'src/business/entities/business.repository';
import { ImagesRepository } from 'src/images/entities/images.repository';
import { JoinCertificationRepository } from 'src/join_certification/entities/join_certification.repository';
import { RestaurantRepository } from 'src/restaurant/entities/restaurant.repository';
import { EntireMenuRepository } from 'src/entire_menu/entities/entire_menu.repository';
import { EntireMenuCategoryRepository } from 'src/entire_menu_category/entities/entire_menu_category.repository';
import { ExposureMenuRepository } from 'src/exposure_menu/entities/exposure_menu.repository';
import { RoomsRepository } from 'src/rooms/entities/rooms.repository';
import { RoomsService } from 'src/rooms/rooms.service';
import { UsersRepository } from 'src/users/entities/users.repository';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { EntireMenuService } from 'src/entire_menu/entire_menu.service';
import { EntireMenuCategoryService } from 'src/entire_menu_category/entire_menu_category.service';
import { ExposureMenuService } from 'src/exposure_menu/exposure_menu.service';
import { AccommodationViewsCountRepository } from 'src/accommodation_views_count/entities/accommodation_views_count.repository';
import { RestaurantViewsCountRepository } from 'src/restaurant_views_count/entities/restaurant_views_count.repository';

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
    RestaurantViewsCountRepository
  ])],
  controllers: [AdminController],
  providers: [
    AdminService,
    AccommodationService,
    RoomsService,
    AccommodationPeakSeasonService,
    RestaurantService,
    EntireMenuService,
    EntireMenuCategoryService,
    ExposureMenuService,
  ]
})
export class AdminModule { }
