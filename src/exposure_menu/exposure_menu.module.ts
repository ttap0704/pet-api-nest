import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesRepository } from 'src/images/entities/images.repository';
import { RestaurantRepository } from 'src/restaurant/entities/restaurant.repository';
import { ExposureMenuRepository } from './entities/exposure_menu.repository';
import { ExposureMenuController } from './exposure_menu.controller';
import { ExposureMenuService } from './exposure_menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExposureMenuRepository, RestaurantRepository, ImagesRepository])],
  controllers: [ExposureMenuController],
  providers: [ExposureMenuService],
  exports: [ExposureMenuService]
})
export class ExposureMenuModule { }
