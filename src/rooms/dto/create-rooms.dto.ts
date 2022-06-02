import { IsNumber, IsOptional, IsString } from "class-validator";
import { Accommodation } from "src/accommodation/entities/accommodation.entity";

export class CreateRoomsDto {
  @IsString()
  readonly label: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly nickname: string;

  @IsNumber()
  readonly normal_price: number;

  @IsNumber()
  readonly normal_weekend_price: number;

  @IsNumber()
  readonly peak_price: number;

  @IsNumber()
  readonly peak_weekend_price: number;

  @IsNumber()
  readonly standard_num: number;

  @IsNumber()
  readonly maximum_num: number;

  @IsString()
  readonly entrance: string;

  @IsString()
  readonly leaving: string;

  @IsOptional()
  @IsString()
  readonly amenities: string;

  @IsOptional()
  @IsString()
  readonly additional_info: string;

  @IsNumber()
  readonly seq: number;

  @IsOptional()
  accommodation: Accommodation
}