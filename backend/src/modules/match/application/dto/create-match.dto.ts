import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class CreateMatchDTO {
  @IsUUID()
  @ApiProperty({ example: `7de5025f-7b27-4065-b613-cba981e70b6a` })
  originAccountId!: string;

  @IsUUID()
  @ApiProperty({ example: `7de5025f-7b27-4065-b613-cba981e70b6a` })
  targetAccountId!: string;
}
