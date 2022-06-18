import { EntityRepository, Repository } from "typeorm";
import { IProfileRepository } from "../../domain/repository/profile.repository";
import { Profile } from "../../domain/entity/profile.entity";
import { ProfileMapper } from "../../application/mapper/profile.mapper";
import { ProfileOrmEntity } from "../entity/profile.entity";

@EntityRepository(ProfileOrmEntity)
export class ProfileRepository extends Repository<ProfileOrmEntity> implements IProfileRepository {
  async findAll(): Promise<Profile[]> {
    const persistedProfiles = await this.find();

    if (!persistedProfiles.length) {
      return [];
    }

    return persistedProfiles.map((persistedProfile) => ProfileMapper.toDomain(persistedProfile));
  }

  async findOneById(uuid: string): Promise<Profile | null> {
    const persistedProfile = await this.findOne({ uuid });

    return persistedProfile ? ProfileMapper.toDomain(persistedProfile) : null;
  }

  async exists(uuid: string): Promise<boolean> {
    if (!uuid) return false;

    const persistedProfile = await this.findOne({ uuid });

    return !!persistedProfile;
  }

  async saveAndReturn(profile: Profile, accountId: string): Promise<Profile> {
    const persistenceProfile = ProfileMapper.toPersistence(profile, accountId);

    const persistedProfile = await this.save(persistenceProfile);

    return ProfileMapper.toDomain(persistedProfile);
  }

  async updateAndReturn(profile: Profile, accountId: string): Promise<Profile> {
    const persistenceProfile = ProfileMapper.toPersistence(profile, accountId);

    await this.update({ uuid: persistenceProfile.uuid }, persistenceProfile);

    const updatedProfile = await this.findOne({ uuid: persistenceProfile.uuid });

    return ProfileMapper.toDomain(updatedProfile);
  }
}
