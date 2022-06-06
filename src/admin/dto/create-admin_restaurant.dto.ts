
import { IsArray, IsObject } from "class-validator";
import { CreateEntireMenuDto } from "src/entire_menu/dto/create-entire_menu.dto";
import { CreateEntireMenuCategoryDto } from "src/entire_menu_category/dto/create-entire_menu_category.dto";
import { CreateExposureMenuDto } from "src/exposure_menu/dto/create-exposure_menu.dto";
import { CreateRestaurantDto } from "src/restaurant/dto/create-restaurant";

interface CreateEntireMenuList extends CreateEntireMenuCategoryDto {
  menu: CreateEntireMenuDto[]
}

export class CreateAdminRestaurantDto {
  @IsObject()
  readonly restaurant: CreateRestaurantDto

  @IsArray()
  readonly exposure_menu: CreateExposureMenuDto[]

  @IsArray()
  readonly entire_menu: CreateEntireMenuList[];
}