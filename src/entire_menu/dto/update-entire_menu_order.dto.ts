import { IsNumber } from "class-validator";

export class UpdateEntireMenuOrderDto {
  @IsNumber()
  readonly id: number;

  @IsNumber()
  readonly seq: number;
}