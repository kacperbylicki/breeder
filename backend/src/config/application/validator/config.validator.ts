import { EnvironmentEnum } from "../../domain/enum/config.enum";
import { IsEnum, IsNotEmpty, IsPositive, IsString, validateSync } from "class-validator";
import { plainToClass } from "class-transformer";

export class EnvironmentVariables {
  @IsEnum(EnvironmentEnum)
  NODE_ENV!: string;

  @IsPositive()
  @IsNotEmpty()
  PORT!: number;

  @IsString()
  @IsNotEmpty()
  ACCESS_TOKEN_SECRET!: string;

  @IsPositive()
  @IsNotEmpty()
  ACCESS_TOKEN_TTL!: number;

  @IsString()
  @IsNotEmpty()
  ACCESS_TOKEN_ALGORITHM!: string;

  @IsString()
  @IsNotEmpty()
  REFRESH_TOKEN_SECRET!: string;

  @IsPositive()
  @IsNotEmpty()
  REFRESH_TOKEN_TTL!: number;

  @IsString()
  @IsNotEmpty()
  REFRESH_TOKEN_ALGORITHM!: string;

  @IsPositive()
  @IsNotEmpty()
  PASSWORD_BCRYPT_ROUNDS!: number;

  @IsString()
  @IsNotEmpty()
  POSTGRES_HOST!: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL!: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_DB!: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_USER!: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_PASSWORD!: string;

  @IsPositive()
  @IsNotEmpty()
  POSTGRES_PORT!: number;

  @IsString()
  @IsNotEmpty()
  S3_IMAGES_BUCKET!: string;
}

export function validate(config: Record<string, unknown>) {
  const configToValidate = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(configToValidate, { skipMissingProperties: false });

  if (errors.length) {
    throw new Error(errors.toString());
  }

  return configToValidate;
}
