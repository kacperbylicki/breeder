import { RefreshToken } from "../../domain/entity/refresh-token.entity";
import { RefreshTokenOrmEntity } from "../../infrastructure/entity/refresh-token.entity";

export class RefreshTokenMapper {
  static toDomain(raw: any): RefreshToken {
    return RefreshToken.create(raw, raw.uuid);
  }

  static toPersistence(refreshToken: RefreshToken): RefreshTokenOrmEntity {
    const persistenceRefreshToken = new RefreshTokenOrmEntity();

    persistenceRefreshToken.uuid = refreshToken.uuid;
    persistenceRefreshToken.token = refreshToken.token;
    persistenceRefreshToken.email = refreshToken.email;
    persistenceRefreshToken.expiration = refreshToken.expiration;

    return persistenceRefreshToken;
  }
}
