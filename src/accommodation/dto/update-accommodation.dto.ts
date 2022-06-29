import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsOptional } from "class-validator";
import { CreateAccommodationDto } from "./create-accommodation.dto";

export class UpdateAccommodationDto extends PartialType(CreateAccommodationDto) {
  @IsOptional()
  @IsNumber()
  status: number;

  @IsOptional()
  @IsNumber()
  warning: number;
}