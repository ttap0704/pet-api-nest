import { Optional } from "@nestjs/common";
import { IsNumber, IsString } from "class-validator";
import { CreateUsersDto } from "src/users/dto/create-users.dto";

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

  @Optional()
  @IsString()
  readonly p_nm2: string;

  @Optional()
  @IsString()
  readonly corp_no: string;
}