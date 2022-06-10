import { IsNumber } from "class-validator";

export class UpdateEntireMenuCategoryOrderDto {
  @IsNumber()
  readonly id: number;

  @IsNumber()
  readonly seq: number;
}