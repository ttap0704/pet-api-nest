import { PartialType } from "@nestjs/mapped-types";
import { CreateExposureMenuDto } from "./create-exposure_menu.dto";

export class UpdateExposureMenuDto extends PartialType(CreateExposureMenuDto) {
}