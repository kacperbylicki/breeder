import { BaseService } from "../../../common";
import { Injectable } from "@nestjs/common";
import { MatchRepository } from "../../../match";
import { Profile, ProfileRepository } from "../../../profile";
import { ReactionRepository } from "../../../reaction";

@Injectable()
export class GetBoardService implements BaseService<string, Profile[]> {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly reactionRepository: ReactionRepository,
    private readonly matchRepository: MatchRepository,
  ) {}

  async execute(accountId: string): Promise<Profile[]> {
    const profiles = await this.profileRepository.findAll();
    const reactions = await this.reactionRepository.findAllByAccountId(accountId);
    const matches = await this.matchRepository.findAllByAccountId(accountId);

    const reactionTargetIds = reactions.map((reaction) => reaction.targetAccountId);
    const matchTargetIds = matches.map((match) => match.targetAccountId);

    const availableProfiles = profiles
      .filter((profile) => !reactionTargetIds.includes(profile.uuid))
      .filter((profile) => !matchTargetIds.includes(profile.uuid));

    return availableProfiles;
  }
}
