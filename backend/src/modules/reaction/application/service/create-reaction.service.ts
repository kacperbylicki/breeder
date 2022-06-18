import { BaseService } from "../../../common";
import { ConflictException, Injectable } from "@nestjs/common";
import { CreateMatchService, Match, MatchMapper, MatchRepository } from "../../../match";
import { CreateReactionDTO } from "../dto/create-reaction.dto";
import { PasswordlessAccount } from "../../../account";
import { Reaction } from "../../domain/entity/reaction.entity";
import { ReactionMapper } from "../mapper/reaction.mapper";
import { ReactionRepository } from "../../infrastructure/repository/reaction.repository";

type CreateReactionPayload = { data: CreateReactionDTO; account: PasswordlessAccount };

@Injectable()
export class CreateReactionService implements BaseService<CreateReactionPayload, Reaction | Match> {
  constructor(
    private readonly reactionRepository: ReactionRepository,
    private readonly matchRepository: MatchRepository,
    private readonly createMatchService: CreateMatchService,
  ) {}

  async isMatch(originAccountId: string, targetAccountId: string): Promise<boolean> {
    const potentialMatch = await this.reactionRepository.findPotentialMatch(
      originAccountId,
      targetAccountId,
    );

    return !!potentialMatch;
  }

  async execute({ data, account }: CreateReactionPayload): Promise<Reaction | Match> {
    const reactionExists = await this.reactionRepository.exists(account.uuid, data.targetAccountId);

    if (reactionExists) {
      throw new ConflictException("Reaction already exists");
    }

    const matchExists = await this.matchRepository.exists(account.uuid, data.targetAccountId);

    if (matchExists) {
      throw new ConflictException("Match already exists");
    }

    const isMatch = await this.isMatch(account.uuid, data.targetAccountId);

    if (isMatch) {
      const matchData = MatchMapper.toCreateDTO(account.uuid, data.targetAccountId);
      const match = await this.createMatchService.execute(matchData);

      await this.reactionRepository.delete({
        originAccountId: account.uuid,
        targetAccountId: data.targetAccountId,
      });

      return match;
    }

    const reaction = ReactionMapper.toDomain(data);

    return this.reactionRepository.saveAndReturn(reaction);
  }
}
