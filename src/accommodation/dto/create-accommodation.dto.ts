import { IsNumber, IsOptional, IsString } from "class-validator";
import { AccommodationPeakSeason } from "src/accommodation_peak_season/entities/accommodation_peak_season.entity";
import { Rooms } from "src/rooms/entities/rooms.entity";
import { Users } from "src/users/entities/users.entity";
import { IsNull } from "typeorm";

export class CreateAccommodationDto {
  @IsString()
  readonly label: string;

  @IsNumber()
  type: number;

  @IsOptional()
  @IsString()
  readonly site: string;

  @IsOptional()
  @IsString()
  readonly contact: string;

  @IsOptional()
  @IsString()
  readonly kakao_chat: string;

  @IsOptional()
  @IsString()
  readonly bname: string;

  @IsOptional()
  @IsString()
  readonly building_name: string;

  @IsOptional()
  @IsString()
  readonly detail_address: string;

  @IsOptional()
  @IsString()
  readonly sido: string;

  @IsOptional()
  @IsString()
  readonly sigungu: string;

  @IsOptional()
  @IsString()
  readonly zonecode: string;

  @IsOptional()
  @IsString()
  readonly road_address: string;

  @IsString()
  readonly introduction: string;

  @IsOptional()
  admin_id: number;

  @IsOptional()
  admin: Users

  @IsOptional()
  accommodation_rooms: Rooms[]

  @IsOptional()
  accommodation_peak_season: AccommodationPeakSeason[]
}