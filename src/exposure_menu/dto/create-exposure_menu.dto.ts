import { IsNumber, IsOptional, IsString } from "class-validator";
import { Restaurant } from "src/restaurant/entities/restaurant.entity";

export class CreateExposureMenuDto {
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
}