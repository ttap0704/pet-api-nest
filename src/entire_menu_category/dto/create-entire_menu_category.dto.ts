import { IsNumber, IsOptional, IsString } from "class-validator";
import { Restaurant } from "src/restaurant/entities/restaurant.entity";

export class CreateEntireMenuCategoryDto {
  @IsString()
  readonly category: string;

  @IsNumber()
  seq: number;

  @IsOptional()
  restaurant: Restaurant
}