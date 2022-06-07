import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsOptional } from "class-validator";
import { CreateEntireMenuCategoryDto } from "./create-entire_menu_category.dto";

export class UpdateEntireMenuCategoryDto extends PartialType(CreateEntireMenuCategoryDto) {
  @IsNumber()
  readonly id: number;
}