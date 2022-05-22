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
    };

    return param ? refreshTokenSettings[param] : refreshTokenSettings;
  }

  getPort() {
    return this.get("PORT");
  }

  getEnvironment() {
    return this.get("ENVIRONMENT");
  }

  getPasswordHashRounds(): number {
    return this.get("PASSWORD_BCRYPT_ROUNDS");
  }

  getDatabaseUri(): string {
    return this.get("DB_URI");
  }

  isDevelopment() {
    return this.isActualEnvironment(EnvironmentEnum.DEVELOPMENT);
  }

  isStaging() {
    return this.isActualEnvironment(EnvironmentEnum.STAGING);
  }

  isProduction() {
    return this.isActualEnvironment(EnvironmentEnum.PRODUCTION);
  }

  private isActualEnvironment(env: keyof typeof EnvironmentEnum) {
    return this.getEnvironment() === env;
  }
}
