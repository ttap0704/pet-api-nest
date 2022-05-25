import { IsNumber, IsString } from "class-validator";

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
  readonly type: number;
}