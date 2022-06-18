import { AccountRepository, PasswordlessAccount } from "../../../account";
import { BaseService } from "../../../common";
import { ConflictException } from "@nestjs/common";
import { CreateProfileDTO } from "../dto/create-profile.dto";
import { ImageDTO } from "../dto/image.dto";
import { Profile } from "../../domain/entity/profile.entity";
import { ProfileMapper } from "../mapper/profile.mapper";
import { ProfileRepository } from "../../infrastructure/repository/profile.repository";
import { UploadImageService } from "./upload-image.service";

type CreateProfilePayload = {
  data: CreateProfileDTO;
  account: PasswordlessAccount;
  image?: ImageDTO;
};

export class CreateProfileService implements BaseService<CreateProfilePayload, Profile> {
  constructor(
    private readonly uploadImageService: UploadImageService,
    private readonly profileRepository: ProfileRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  async execute({ data, account, image }: CreateProfilePayload): Promise<Profile> {
    const persistedAccount = await this.accountRepository.findOneByEmail(account.email);
    const persistedProfile = persistedAccount?.profile;

    if (persistedProfile) {
      throw new ConflictException("Profile already exists");
    }

    const avatar = image
      ? await this.uploadImageService.execute({ data: image, filename: account.profile.name })
      : null;

    const profile = ProfileMapper.toDomain({ ...data, avatar });

    return this.profileRepository.saveAndReturn(profile, account.uuid);
  }
}
