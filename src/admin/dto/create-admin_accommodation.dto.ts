
import { IsArray, IsNumber, IsObject, IsString } from "class-validator";
import { CreateAccommodationDto } from "src/accommodation/dto/create-accommodation.dto";
import { CreateAccommodationPeakSeasonDto } from "src/accommodation_peak_season/dto/create-accommodation_peak_season.dto";
import { CreateRoomsDto } from "src/rooms/dto/create-rooms.dto";

export class CreateAdminAccommodationDto {
  @IsObject()
  readonly accommodation: CreateAccommodationDto

  @IsArray()
  readonly rooms: CreateRoomsDto[]

  @IsArray()
  readonly peak_season: CreateAccommodationPeakSeasonDto[];
}