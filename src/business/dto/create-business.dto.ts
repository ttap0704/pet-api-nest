import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBusinessDto {

  @IsString()
  readonly b_nm: string;

  @IsString()
  readonly b_no: string;

  @IsString()
  readonly b_sector: string;

  @IsString()
  readonly b_type: string;

  @IsString()
  readonly p_nm: string;

  @IsString()
  readonly start_dt: string;

  @IsOptional()
  @IsString()
  readonly p_nm2: string;

  @IsOptional()
  @IsString()
  readonly corp_no: string;
}