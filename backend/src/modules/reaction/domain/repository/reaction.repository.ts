import { Reaction } from "../entity/reaction.entity";

export interface IReactionRepository {
  exists: (originAccountId: string, targetAccountId: string) => Promise<boolean>;
  findAllByAccountId: (accountId: string) => Promise<Reaction[]>;
  findPotentialMatch: (
    originAccountId: string,
    targetAccountId: string,
  ) => Promise<Reaction | null>;
  saveAndReturn: (reaction: Reaction) => Promise<Reaction>;
}
