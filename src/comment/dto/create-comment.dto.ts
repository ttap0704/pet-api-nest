import { IsNumber, IsOptional, IsString } from "class-validator";
import { Users } from "src/users/entities/users.entity";

export class CreateCommentDto {
  @IsString()
  readonly comment: string;

  @IsNumber()
  category: number;

  @IsNumber()
  readonly target_id: number;

  @IsOptional()
  readonly writer_id: number;

  @IsOptional()
  writer: Users
}