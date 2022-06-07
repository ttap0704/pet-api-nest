import { PartialType } from "@nestjs/mapped-types";
import { CreateRestaurantDto } from "./create-restaurant";

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) { }