
import { IsNumber, IsString } from "class-validator";
import { CreateBusinessDto } from "src/business/dto/create-business.dto";
import { CreateUsersDto } from "src/users/dto/create-users.dto";

export class CreateManagerDto {
  readonly join_data: CreateUsersDto
  readonly business_data: CreateBusinessDto;
}