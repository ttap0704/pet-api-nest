import { Optional } from "@nestjs/common";
import { IsNumber, IsObject, IsString } from "class-validator";
import { Users } from "src/users/entities/users.entity";

export class CreateJoinCertificationDto {
  @IsString()
  readonly cert_num: string;

  @IsNumber()
  readonly admin_id: number;
}