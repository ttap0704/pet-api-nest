import { IsNumber } from "class-validator";

export class UpdateExposureMenuOrderDto {
  @IsNumber()
  readonly id: number;

  @IsNumber()
  readonly seq: number;
}