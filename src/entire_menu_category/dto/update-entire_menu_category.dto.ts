import { PartialType } from "@nestjs/mapped-types";
import { CreateEntireMenuCategoryDto } from "./create-entire_menu_category.dto";

export class UpdateEntireMenuCategoryDto extends PartialType(CreateEntireMenuCategoryDto) {
}