import { IsNumber, IsString } from "class-validator";

export class CreateNoticeDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly contents: string;

  @IsNumber()
  readonly target: number;
}