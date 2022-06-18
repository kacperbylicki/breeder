import { ApiPropertyOptional } from "@nestjs/swagger";

export class ImageDTO {
  @ApiPropertyOptional()
  fieldname?: string;

  @ApiPropertyOptional()
  originalname?: string;

  @ApiPropertyOptional()
  encoding?: string;

  @ApiPropertyOptional()
  mimetype?: string;

  @ApiPropertyOptional()
  buffer?: Buffer;

  @ApiPropertyOptional()
  size?: number;
}
