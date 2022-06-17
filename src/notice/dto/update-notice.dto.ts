import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsOptional } from "class-validator";
import { CreateNoticeDto } from "./create-notice.dto";

export class UpdateNoticeDto extends PartialType(CreateNoticeDto) {
  @IsOptional()
  @IsNumber()
  readonly status: number;
}