import { Optional } from "@nestjs/common";
import { IsNumber, IsString } from "class-validator";
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

  @Optional()
  business_id: number;

  @Optional()
  business: Business
}