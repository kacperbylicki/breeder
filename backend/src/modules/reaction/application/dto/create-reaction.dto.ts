import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsUUID } from "class-validator";
import { ReactionType } from "../../domain/enum/reaction-type.enum";

export class CreateReactionDTO {
  @IsEnum(ReactionType)
  @ApiProperty({ example: `positive` })
  type!: ReactionType;

  @IsUUID()
  @ApiProperty({ example: `7de5025f-7b27-4065-b613-cba981e70b6a` })
  targetAccountId!: string;
}
