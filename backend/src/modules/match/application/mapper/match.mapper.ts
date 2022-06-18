import { CreateMatchDTO } from "../dto/create-match.dto";
import { Match } from "../../domain/entity/match.entity";
import { MatchOrmEntity } from "../../infrastructure/entity/match.entity";
import { plainToInstance } from "class-transformer";

export class MatchMapper {
  static toDomain(raw: any): Match {
    return Match.create(raw, raw.uuid);
  }

  static toPersistence(match: Match): MatchOrmEntity {
    const persistenceMatch = new MatchOrmEntity();

    persistenceMatch.uuid = match.uuid;
    persistenceMatch.originAccountId = match.originAccountId;
    persistenceMatch.targetAccountId = match.targetAccountId;

    return persistenceMatch;
  }

  static toCreateDTO(originAccountId: string, targetAccountId: string): CreateMatchDTO {
    return plainToInstance(CreateMatchDTO, { originAccountId, targetAccountId });
  }
}
