import { IsNumber, IsObject, IsString } from "class-validator";

export class CompareJoinCertificationDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly cert_num: string;
}