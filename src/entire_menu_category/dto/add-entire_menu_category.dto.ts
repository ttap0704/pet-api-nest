import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateEntireMenuDto } from "src/entire_menu/dto/create-entire_menu.dto";
import { Restaurant } from "src/restaurant/entities/restaurant.entity";

export class AddEntireMenuCategoryDto {
  @IsString()
  readonly category: string;

  @IsNumber()
  @IsOptional()
  seq: number;

  @IsArray()
  menu: CreateEntireMenuDto[]

  @IsOptional()
  restaurant: Restaurant
}