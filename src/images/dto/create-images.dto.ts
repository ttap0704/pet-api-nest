import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateImagesDto {
  @IsString()
  readonly file_name: string;

  @IsNumber()
  readonly category: number;

  @IsNumber()
  readonly target_id: number;

  @IsNumber()
  readonly seq: number;

}