
import { IsNumber, IsObject, IsString } from "class-validator";
import { CreateBusinessDto } from "src/business/dto/create-business.dto";
import { CreateUsersDto } from "src/users/dto/create-users.dto";

export class CreateAdminDto {
  @IsObject()
  readonly join_data: CreateUsersDto

  @IsObject()
  readonly business_data: CreateBusinessDto;
}