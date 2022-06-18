import { Match } from "../entity/match.entity";

export interface IMatchRepository {
  exists: (originAccountId: string, targetAccountId: string) => Promise<boolean>;
  findAllByAccountId: (accountId: string) => Promise<Match[]>;
  saveAndReturn: (match: Match) => Promise<Match>;
}
