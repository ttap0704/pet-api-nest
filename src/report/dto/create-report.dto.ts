import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateReportDto {

  @IsNumber()
  readonly reason: number;

  @IsNumber()
  readonly category: number;

  @IsNumber()
  readonly target_id: number;

  @IsOptional()
  @IsNumber()
  readonly reporter: number;

  @IsOptional()
  @IsString()
  ip: string;
}