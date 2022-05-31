import { IsNumber, IsOptional, IsString } from "class-validator";
import { Business } from "src/business/entities/business.entity";

export class CreateUsersDto {
  @IsString()
  readonly login_id: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly nickname: string;

  @IsNumber()
  type: number;

  @IsOptional()
  business_id: number;

  @IsOptional()
  business: Business
}