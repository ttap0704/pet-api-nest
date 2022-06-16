import { IsNumber, IsString } from "class-validator";

export class CreateNoticeDto {
  @IsString()
  readonly contents: string;

  @IsNumber()
  readonly target: number;
}