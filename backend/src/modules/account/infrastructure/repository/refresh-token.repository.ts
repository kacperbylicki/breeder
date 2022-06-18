import { EntityRepository, Repository } from "typeorm";
import { IRefreshTokenRepository } from "../../domain/repository/refresh-token.repository";
import { RefreshToken } from "../../domain/entity/refresh-token.entity";
import { RefreshTokenMapper } from "../../application/mapper/refresh-token.mapper";
import { RefreshTokenOrmEntity } from "../entity/refresh-token.entity";

@EntityRepository(RefreshTokenOrmEntity)
export class RefreshTokenRepository
  extends Repository<RefreshTokenOrmEntity>
  implements IRefreshTokenRepository
{
  async findOneByEmail(email: string): Promise<RefreshToken | null> {
    const persistedRefreshToken = await this.findOne({ email });

    return persistedRefreshToken ? RefreshTokenMapper.toDomain(persistedRefreshToken) : null;
  }

  async upsertAndReturn(refreshToken: RefreshToken): Promise<RefreshToken> {
    const persistenceRefreshToken = RefreshTokenMapper.toPersistence(refreshToken);

    const params = ["email"];

    const upsertedRefreshToken = await this.upsert(persistenceRefreshToken, params);

    return RefreshTokenMapper.toDomain(upsertedRefreshToken);
  }

  async deleteOne(email: string): Promise<void> {
    await this.delete({ email });
  }
}
