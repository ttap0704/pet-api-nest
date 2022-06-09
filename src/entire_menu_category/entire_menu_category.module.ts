import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntireMenuRepository } from 'src/entire_menu/entities/entire_menu.repository';
import { RestaurantRepository } from 'src/restaurant/entities/restaurant.repository';
import { EntireMenuCategoryController } from './entire_menu_category.controller';
import { EntireMenuCategoryService } from './entire_menu_category.service';
import { EntireMenuCategoryRepository } from './entities/entire_menu_category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EntireMenuCategoryRepository, RestaurantRepository, EntireMenuRepository])],
  controllers: [EntireMenuCategoryController],
  providers: [EntireMenuCategoryService],
  exports: [EntireMenuCategoryService]
})
export class EntireMenuCategoryModule { }
