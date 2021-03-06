import { ImageMapper } from "./image.mapper";
import { Profile } from "../../domain/entity/profile.entity";
import { ProfileOrmEntity } from "../../infrastructure/entity/profile.entity";

export class ProfileMapper {
  static toDomain(raw: any): Profile {
    return Profile.create(raw, raw.uuid);
  }

  static toPersistence(profile: Profile, accountUuid: string): ProfileOrmEntity {
    const persistenceProfile = new ProfileOrmEntity();
    const persistenceImage = profile.avatar ? ImageMapper.toPersistence(profile.avatar) : null;

    persistenceProfile.uuid = profile.uuid;
    persistenceProfile.name = profile.name;
    persistenceProfile.breed = profile.breed;
    persistenceProfile.age = profile.age;
    persistenceProfile.gender = profile.gender;
    persistenceProfile.location = profile.location;
    persistenceProfile.accountUuid = accountUuid;
    persistenceProfile.avatar = persistenceImage;

    return persistenceProfile;
  }
}
