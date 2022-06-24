import { BaseService } from "../../../common";
import { Injectable } from "@nestjs/common";
import { Reaction } from "../../domain/entity/reaction.entity";
import { ReactionRepository } from "../../infrastructure/repository/reaction.repository";

@Injectable()
export class GetReactionsService implements BaseService<string, Reaction[]> {
  constructor(private readonly reactionRepository: ReactionRepository) {}

  async execute(accountId: string): Promise<Reaction[]> {
    return this.reactionRepository.findAllByAccountId(accountId);
  }
}
