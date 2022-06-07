import { PartialType } from "@nestjs/mapped-types";
import { IsNumber } from "class-validator";
import { CreateExposureMenuDto } from "./create-exposure_menu.dto";

export class UpdateExposureMenuyDto extends PartialType(CreateExposureMenuDto) {
  @IsNumber()
  readonly id: number;
}