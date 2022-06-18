import { Reaction } from "../../domain/entity/reaction.entity";
import { ReactionOrmEntity } from "../../infrastructure/entity/reaction.entity";

export class ReactionMapper {
  static toDomain(raw: any): Reaction {
    return Reaction.create(raw, raw.uuid);
  }

  static toPersistence(reaction: Reaction): ReactionOrmEntity {
    const persistenceReaction = new ReactionOrmEntity();

    persistenceReaction.uuid = reaction.uuid;
    persistenceReaction.type = reaction.type;
    persistenceReaction.originAccountId = reaction.originAccountId;
    persistenceReaction.targetAccountId = reaction.targetAccountId;

    return persistenceReaction;
  }
}
