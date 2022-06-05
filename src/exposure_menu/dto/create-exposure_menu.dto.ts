import { IsNumber, IsOptional, IsString } from "class-validator";
import { AccommodationPeakSeason } from "src/accommodation_peak_season/entities/accommodation_peak_season.entity";
import { Rooms } from "src/rooms/entities/rooms.entity";
import { Users } from "src/users/entities/users.entity";
import { IsNull } from "typeorm";

export class CreateAccommodationDto {
  @IsString()
  readonly label: string;

  @IsNumber()
  readonly price: number;

  @IsString()
  readonly comment: string;

  @IsNumber()
  seq: number;
}