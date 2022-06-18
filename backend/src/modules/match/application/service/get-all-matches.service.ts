import { BaseService } from "../../../common";
import { Injectable } from "@nestjs/common";
import { Match } from "../../domain/entity/match.entity";
import { MatchRepository } from "../../infrastructure/repository/match.repository";

@Injectable()
export class GetAllMatchesService implements BaseService<string, Match[]> {
  constructor(private readonly matchRepository: MatchRepository) {}

  async execute(accountId: string): Promise<Match[]> {
    return this.matchRepository.findAllByAccountId(accountId);
  }
}
