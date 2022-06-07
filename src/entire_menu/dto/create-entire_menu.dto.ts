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

  @IsString()
  readonly comment: string;

  @IsNumber()
  seq: number;

  @IsOptional()
  restaurant: Restaurant

  @IsOptional()
  entire_menu_category: EntireMenuCategory
}