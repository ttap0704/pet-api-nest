import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLikeDto {
  @IsNumber()
  readonly user_id: number;

  @IsNumber()
  readonly category: number;

  @IsNumber()
  readonly target_id: number;
}