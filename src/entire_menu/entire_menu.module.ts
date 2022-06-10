import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntireMenuCategoryRepository } from 'src/entire_menu_category/entities/entire_menu_category.repository';
import { RestaurantRepository } from 'src/restaurant/entities/restaurant.repository';
import { EntireMenuController } from './entire_menu.controller';
import { EntireMenuService } from './entire_menu.service';
import { EntireMenuRepository } from './entities/entire_menu.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EntireMenuRepository, RestaurantRepository, EntireMenuCategoryRepository])],
  controllers: [EntireMenuController],
  providers: [EntireMenuService],
  exports: [EntireMenuService]
})
export class EntireMenuModule { }
