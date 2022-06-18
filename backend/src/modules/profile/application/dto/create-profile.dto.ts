import { ApiProperty } from "@nestjs/swagger";
import { Breed } from "../../domain/enum/breed.enum";
import { Gender } from "../../domain/enum/gender.enum";
import { IsDate, IsEnum, IsString, MaxLength, MinLength } from "class-validator";
import { ProfileConstraints } from "../../domain/enum/profile-constraints.enum";
import { Type } from "class-transformer";

export class CreateProfileDTO {
  @IsString()
  @MinLength(ProfileConstraints.NameMinLength)
  @MaxLength(ProfileConstraints.NameMaxLength)
  @ApiProperty({ example: `John Doe` })
  name!: string;

  @IsEnum(Breed)
  @ApiProperty({ example: `Shih Tzu` })
  breed!: Breed;

  @Type(() => Date)
  @IsDate()
  @ApiProperty({ example: `1999-01-01` })
  dateOfBirth!: Date;

  @IsEnum(Gender)
  @ApiProperty({ example: `female` })
  gender!: Gender;

  @IsString()
  @MinLength(ProfileConstraints.LocationMinLength)
  @MaxLength(ProfileConstraints.LocationMaxLength)
  @ApiProperty({ example: `Warsaw, Poland` })
  location!: string;
}
