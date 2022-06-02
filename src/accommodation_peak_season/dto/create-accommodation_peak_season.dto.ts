import { IsNumber, IsOptional, IsString } from "class-validator";
import { Accommodation } from "src/accommodation/entities/accommodation.entity";

export class CreateAccommodationPeakSeasonDto {
  @IsString()
  readonly start: string;

  @IsString()
  readonly end: string;

  @IsOptional()
  accommodation: Accommodation
}