import { Profile } from "../entity/profile.entity";

export interface IProfileRepository {
  findAll: () => Promise<Profile[] | null>;
  findOneById: (accountId: string) => Promise<Profile | null>;
  exists: (accountId: string) => Promise<boolean>;
  saveAndReturn: (profile: Profile, accountId: string) => Promise<Profile>;
  updateAndReturn: (profile: Profile, accountId: string) => Promise<Profile | null>;
}
