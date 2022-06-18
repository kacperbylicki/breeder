import { BaseService } from "../../../common";
import { Injectable } from "@nestjs/common";
import { Profile } from "../../domain/entity/profile.entity";
import { ProfileRepository } from "../../infrastructure/repository/profile.repository";

@Injectable()
export class GetProfileService implements BaseService<string, Profile | null> {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute(accountId: string): Promise<Profile | null> {
    return this.profileRepository.findOneByAccountId(accountId);
  }
}
