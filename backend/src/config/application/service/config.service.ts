import { AccessTokenSettings } from "../../domain/type/access-token.settings";
import { ConfigService } from "@nestjs/config";
import { EnvironmentEnum } from "../../domain/enum/config.enum";
import { EnvironmentVariables } from "../validator/config.validator";
import { Injectable } from "@nestjs/common";
import { RefreshTokenSettings } from "../../domain/type/refresh-token.settings";

@Injectable()
export class AppConfigService extends ConfigService {
  get<
    EnvKeyType extends keyof EnvironmentVariables,
    EnvValueType extends EnvironmentVariables[EnvKeyType] = EnvironmentVariables[EnvKeyType],
  >(key: EnvKeyType): EnvValueType {
    return super.get(key) as EnvValueType;
  }

  getAccessTokenSettings(): AccessTokenSettings;
  getAccessTokenSettings<T extends keyof AccessTokenSettings>(param: T): AccessTokenSettings[T];
  getAccessTokenSettings<T extends keyof AccessTokenSettings>(
    param?: T,
  ): AccessTokenSettings | AccessTokenSettings[T] {
    const accessTokenSettings: AccessTokenSettings = {
      secret: this.get("ACCESS_TOKEN_SECRET"),
      ttl: this.get("ACCESS_TOKEN_TTL"),
      algorithm: this.get("ACCESS_TOKEN_ALGORITHM"),
    };

    return param ? accessTokenSettings[param] : accessTokenSettings;
  }

  getRefreshTokenSettings(): RefreshTokenSettings;
  getRefreshTokenSettings<T extends keyof RefreshTokenSettings>(param: T): RefreshTokenSettings[T];
  getRefreshTokenSettings<T extends keyof RefreshTokenSettings>(
    param?: T,
  ): RefreshTokenSettings | RefreshTokenSettings[T] {
    const refreshTokenSettings: RefreshTokenSettings = {
      secret: this.get("REFRESH_TOKEN_SECRET"),
      ttl: this.get("REFRESH_TOKEN_TTL"),
      algorithm: this.get("REFRESH_TOKEN_ALGORITHM"),
    };

    return param ? refreshTokenSettings[param] : refreshTokenSettings;
  }

  getPort() {
    return this.get("PORT");
  }

  getEnvironment() {
    return this.get("NODE_ENV");
  }

  getPasswordHashRounds(): number {
    return this.get("PASSWORD_BCRYPT_ROUNDS");
  }

  getDatabaseUrl(): string {
    return this.get("DATABASE_URL");
  }

  getDatabaseHost(): string {
    return this.get("POSTGRES_HOST");
  }

  getDatabase(): string {
    return this.get("POSTGRES_DB");
  }

  getDatabaseUser(): string {
    return this.get("POSTGRES_USER");
  }

  getDatabasePassword(): string {
    return this.get("POSTGRES_PASSWORD");
  }

  getDatabasePort(): number {
    return this.get("POSTGRES_PORT");
  }

  getImagesBucket(): string {
    return this.get("BREEDER_IMAGE_BUCKET_NAME");
  }

  getAccessKeyId(): string {
    return this.get("AWS_ACCESS_KEY_ID");
  }

  getSecretAccessKey(): string {
    return this.get("AWS_SECRET_ACCESS_KEY");
  }

  getAwsRegion(): string {
    return this.get("AWS_REGION");
  }

  isDevelopment() {
    return this.isActualEnvironment(EnvironmentEnum.development);
  }

  isStaging() {
    return this.isActualEnvironment(EnvironmentEnum.staging);
  }

  isProduction() {
    return this.isActualEnvironment(EnvironmentEnum.production);
  }

  private isActualEnvironment(env: keyof typeof EnvironmentEnum) {
    return this.getEnvironment() === env;
  }
}
