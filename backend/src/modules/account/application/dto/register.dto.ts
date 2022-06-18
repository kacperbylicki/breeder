import { AccountConstraints } from "../../domain/enum/account-constraints.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDTO {
  @IsEmail()
  @MaxLength(AccountConstraints.EmailMaxLength)
  @ApiProperty({ example: `john.doe@mail.com` })
  public email!: string;

  @IsString()
  @MinLength(AccountConstraints.UsernameMinLength)
  @MaxLength(AccountConstraints.UsernameMaxLength)
  @ApiProperty({ example: `johndoe` })
  public username!: string;

  @IsString()
  @MinLength(AccountConstraints.PasswordMinLength)
  @MaxLength(AccountConstraints.PasswordMaxLength)
  @ApiProperty({ example: `kigrHXCxAJ2azFhyXPFy` })
  public password!: string;

  @IsString()
  @MinLength(AccountConstraints.PasswordMinLength)
  @MaxLength(AccountConstraints.PasswordMaxLength)
  @ApiProperty({ example: `kigrHXCxAJ2azFhyXPFy` })
  public confirmPassword!: string;
}
