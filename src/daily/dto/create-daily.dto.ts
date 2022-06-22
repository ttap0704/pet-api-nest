import { IsNumber, IsOptional, IsString } from "class-validator";
import { Users } from "src/users/entities/users.entity";

export class CreateDailyDto {
  @IsString()
  readonly contents: string;

  @IsOptional()
  readonly writer_id: number;

  @IsOptional()
  writer: Users
}