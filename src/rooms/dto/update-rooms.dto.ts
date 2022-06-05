import { PartialType } from "@nestjs/mapped-types";
import { CreateRoomsDto } from "./create-rooms.dto";

export class UpdateRoomsDto extends PartialType(CreateRoomsDto) { }