import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUsersTokenDto {

  @IsNumber()
  readonly user_id: number;

  @IsString()
  readonly access_token: string;

  @IsString()
  readonly refresh_token: string;

  @IsString()
  readonly ip: string;
}