import { EntityRepository, Repository } from "typeorm";
import { IMatchRepository } from "../../domain/repository/match.repository";
import { Match } from "../../domain/entity/match.entity";
import { MatchMapper } from "../../application/mapper/match.mapper";
import { MatchOrmEntity } from "../entity/match.entity";

@EntityRepository(MatchOrmEntity)
export class MatchRepository extends Repository<MatchOrmEntity> implements IMatchRepository {
  async exists(originAccountId: string, targetAccountId: string): Promise<boolean> {
    const persistedMatch = await this.findOne({
      where: { originAccountId, targetAccountId },
    });

    return !!persistedMatch;
  }

  async findAllByAccountId(accountId: string): Promise<Match[]> {
    const persistedAccountMatches = await this.find({ where: { originAccountId: accountId } });

    if (!persistedAccountMatches.length) {
      return [];
    }

    return persistedAccountMatches.map((persistedAccountMatch) =>
      MatchMapper.toDomain(persistedAccountMatch),
    );
  }

  async saveAndReturn(match: Match): Promise<Match> {
    const persistenceMatch = MatchMapper.toPersistence(match);

    const persistedMatch = await this.save(persistenceMatch);

    return MatchMapper.toDomain(persistedMatch);
  }
}
