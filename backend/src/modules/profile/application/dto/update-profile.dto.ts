import { CreateProfileDTO } from "./create-profile.dto";
import { PartialType } from "@nestjs/swagger";

export class UpdateProfileDTO extends PartialType(CreateProfileDTO) {}
