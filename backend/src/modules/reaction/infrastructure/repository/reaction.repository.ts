import { EntityRepository, Repository } from "typeorm";
import { IReactionRepository } from "../../domain/repository/reaction.repository";
import { Reaction } from "../../domain/entity/reaction.entity";
import { ReactionMapper } from "../../application/mapper/reaction.mapper";
import { ReactionOrmEntity } from "../entity/reaction.entity";
import { ReactionType } from "../../domain/enum/reaction-type.enum";

@EntityRepository(ReactionOrmEntity)
export class ReactionRepository
  extends Repository<ReactionOrmEntity>
  implements IReactionRepository
{
  async exists(originAccountId: string, targetAccountId: string): Promise<boolean> {
    const persistedReaction = await this.findOne({
      where: { originAccountId, targetAccountId },
    });

    return !!persistedReaction;
  }

  async findAllByAccountId(accountId: string): Promise<Reaction[]> {
    const persistedAccountReactions = await this.find({ where: { originAccountId: accountId } });

    if (!persistedAccountReactions.length) {
      return [];
    }

    return persistedAccountReactions.map((persistedAccountReaction) =>
      ReactionMapper.toDomain(persistedAccountReaction),
    );
  }

  async findPotentialMatch(
    originAccountId: string,
    targetAccountId: string,
  ): Promise<Reaction | null> {
    const persistedReaction = await this.find({
      where: {
        originAccountId: targetAccountId,
        targetAccountId: originAccountId,
        type: ReactionType.positive,
      },
    });

    return persistedReaction ? ReactionMapper.toDomain(persistedReaction) : null;
  }

  async saveAndReturn(reaction: Reaction): Promise<Reaction> {
    const persistenceReaction = ReactionMapper.toPersistence(reaction);

    const persistedReaction = await this.save(persistenceReaction);

    return ReactionMapper.toDomain(persistedReaction);
  }
}
