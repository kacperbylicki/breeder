import { BaseService } from "../../../common";
import { Profile } from "../../domain/entity/profile.entity";
import { ProfileRepository } from "../../infrastructure/repository/profile.repository";

export class GetProfileService implements BaseService<string, Profile | null> {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute(profileId: string): Promise<Profile | null> {
    return profileId ? this.profileRepository.findOneById(profileId) : null;
  }
}
