import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { CreateUsersDto } from "./create-users.dto";

export class UpdateUsersDto extends PartialType(CreateUsersDto) {
  @IsOptional()
  @IsNumber()
  warning: number
}