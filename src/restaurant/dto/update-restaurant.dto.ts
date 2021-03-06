import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsOptional } from "class-validator";
import { CreateRestaurantDto } from "./create-restaurant.dto";

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {
  @IsOptional()
  @IsNumber()
  status: number

  @IsOptional()
  @IsNumber()
  warning: number
}