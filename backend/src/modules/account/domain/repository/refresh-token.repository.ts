import { RefreshToken } from "../entity/refresh-token.entity";

export interface IRefreshTokenRepository {
  findOneByEmail(key: string): Promise<RefreshToken | null>;
  upsertAndReturn(refreshToken: RefreshToken): Promise<RefreshToken>;
  deleteOne(key: string): Promise<void>;
}
