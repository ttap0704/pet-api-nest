import { IsString } from "class-validator";

export class LoginUsersDto {
  @IsString()
  readonly login_id: string;

  @IsString()
  readonly password: string;
}