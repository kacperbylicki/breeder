import { AppConfigService } from "../../config";
import { BreedController } from "./application/controller/breed.controller";
import { CreateProfileService } from "./application/service/create-profile.service";
import { GetBreedService } from "./application/service/get-breed.service";
import { GetProfileService } from "./application/service/get-profile.service";
import { ImageRepository } from "./infrastructure/repository/image.repository";
import { Module } from "@nestjs/common";
import { ProfileController } from "./application/controller/profile.controller";
import { ProfileRepository } from "./infrastructure/repository/profile.repository";
import { S3 } from "aws-sdk";
import { UpdateProfileService } from "./application/service/update-profile.service";
import { UploadImageService } from "./application/service/upload-image.service";

@Module({
  controllers: [BreedController, ProfileController],
  providers: [
    {
      provide: "S3_CLIENT",
      useFactory: async (_configService: AppConfigService): Promise<S3> => {
        return new S3();
      },
      inject: [AppConfigService],
    },
    CreateProfileService,
    GetBreedService,
    GetProfileService,
    UpdateProfileService,
    UploadImageService,
    ImageRepository,
    ProfileRepository,
  ],
  exports: [
    CreateProfileService,
    GetBreedService,
    GetProfileService,
    UpdateProfileService,
    UploadImageService,
  ],
})
export class ProfileModule {}