import { PartialType } from "@nestjs/mapped-types";
import { CreateEntireMenuDto } from "./create-entire_menu.dto";

export class UpdateEntireMenuDto extends PartialType(CreateEntireMenuDto) { }