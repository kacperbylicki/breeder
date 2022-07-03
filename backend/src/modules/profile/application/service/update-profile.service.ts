import dayjs from "dayjs";
import { BaseService } from "../../../common";
import { ImageDTO } from "../dto/image.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PasswordlessAccount } from "../../../account";
import { Profile } from "../../domain/entity/profile.entity";
import { ProfileMapper } from "../mapper/profile.mapper";
import { ProfileRepository } from "../../infrastructure/repository/profile.repository";
import { UpdateProfileDTO } from "../dto/update-profile.dto";
import { UploadImageService } from "./upload-image.service";

type UpdateProfilePayload = {
  data: UpdateProfileDTO;
  account: PasswordlessAccount;
  avatar?: ImageDTO;
};

@Injectable()
export class UpdateProfileService implements BaseService<UpdateProfilePayload, Profile | null> {
  constructor(
    private readonly uploadImageService: UploadImageService,
    private readonly profileRepository: ProfileRepository,
  ) {}

  async execute({ data, account, avatar }: UpdateProfilePayload): Promise<Profile | null> {
    const persistedProfile = await this.profileRepository.findOneByAccountId(account.uuid);

    if (!persistedProfile) {
      throw new NotFoundException("Profile not exist");
    }

    const persistedAvatar = avatar
      ? await this.uploadImageService.execute({ data: avatar, filename: account.uuid })
      : null;

    const currentDate = dayjs();
    const age = currentDate.diff(data?.dateOfBirth, "year");

    const profile = ProfileMapper.toDomain({ ...persistedProfile, ...data, age, persistedAvatar });

    return this.profileRepository.updateAndReturn(profile, account.uuid);
  }
}
