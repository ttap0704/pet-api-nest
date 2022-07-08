import { IsNumber, IsOptional, IsString } from "class-validator";
import { Business } from "src/business/entities/business.entity";

export class CreateUsersDto {
  @IsString()
  readonly login_id: string;

  @IsOptional()
  @IsString()
  readonly password: string;

  @IsString()
  readonly nickname: string;

  @IsOptional()
  readonly kakao: number;

  @IsOptional()
  readonly naver: number;

  @IsOptional()
  @IsNumber()
  readonly male: number;

  @IsOptional()
  @IsNumber()
  readonly birth_year: number;

  @IsOptional()
  @IsNumber()
  type: number;

  @IsOptional()
  business_id: number;

  @IsOptional()
  business: Business
}