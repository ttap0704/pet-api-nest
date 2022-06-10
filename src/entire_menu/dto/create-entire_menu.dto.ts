import { IsNumber, IsOptional, IsString } from "class-validator";
import { EntireMenuCategory } from "src/entire_menu_category/entities/entire_menu_category.entity";
import { Restaurant } from "src/restaurant/entities/restaurant.entity";

export class CreateEntireMenuDto {
  @IsOptional()
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly label: string;

  @IsNumber()
  readonly price: number;

  @IsNumber()
  seq: number;

  @IsOptional()
  restaurant: Restaurant

  @IsOptional()
  category: EntireMenuCategory
}