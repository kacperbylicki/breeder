import dayjs from "dayjs";
import { AccountRepository, PasswordlessAccount } from "../../../account";
import { BaseService } from "../../../common";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
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

@Injectable()
export class CreateProfileService implements BaseService<CreateProfilePayload, Profile> {
  constructor(
    private readonly uploadImageService: UploadImageService,
    private readonly profileRepository: ProfileRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  async execute({ data, account, image }: CreateProfilePayload): Promise<Profile> {
    const profileExists = await this.profileRepository.exists(account.uuid);

    if (profileExists) {
      throw new ConflictException("Profile already exists");
    }

    const avatar = image
      ? await this.uploadImageService.execute({ data: image, filename: account.profile.name })
      : null;

    const currentDate = dayjs();
    const age = currentDate.diff(data?.dateOfBirth, "year");

    const profile = ProfileMapper.toDomain({ ...data, age, avatar });
    const persistedProfile = await this.profileRepository.saveAndReturn(profile, account.uuid);

    const persistedAccount = await this.accountRepository.findOneById(account.uuid);

    if (!persistedAccount) {
      throw new NotFoundException("Account not found");
    }

    await this.accountRepository.updateAndReturn({ ...persistedAccount, profile });

    return persistedProfile;
  }
}
