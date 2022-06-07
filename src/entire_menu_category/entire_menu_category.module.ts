import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntireMenuCategoryController } from './entire_menu_category.controller';
import { EntireMenuCategoryService } from './entire_menu_category.service';
import { EntireMenuCategoryRepository } from './entities/entire_menu_category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EntireMenuCategoryRepository])],
  controllers: [EntireMenuCategoryController],
  providers: [EntireMenuCategoryService],
  exports: [EntireMenuCategoryService]
})
export class EntireMenuCategoryModule { }
