import AWS, { S3 } from "aws-sdk";
import { AccountRepository } from "../account";
import { AppConfigService } from "../../config";
import { BreedController } from "./application/controller/breed.controller";
import { CreateProfileService } from "./application/service/create-profile.service";
import { GetBreedService } from "./application/service/get-breed.service";
import { GetProfileByAccountIdService } from "./application/service/get-profile-by-account-id.service";
import { GetProfileService } from "./application/service/get-profile.service";
import { ImageRepository } from "./infrastructure/repository/image.repository";
import { Module } from "@nestjs/common";
import { ProfileController } from "./application/controller/profile.controller";
import { ProfileRepository } from "./infrastructure/repository/profile.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UpdateProfileService } from "./application/service/update-profile.service";
import { UploadImageService } from "./application/service/upload-image.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountRepository]),
    TypeOrmModule.forFeature([ProfileRepository]),
    TypeOrmModule.forFeature([ImageRepository]),
  ],
  controllers: [BreedController, ProfileController],
  providers: [
    {
      provide: "S3_CLIENT",
      useFactory: async (configService: AppConfigService): Promise<S3> => {
        AWS.config.update({
          accessKeyId: configService.getAccessKeyId(),
          secretAccessKey: configService.getSecretAccessKey(),
          region: configService.getAwsRegion(),
        });

        return new S3();
      },
      inject: [AppConfigService],
    },
    CreateProfileService,
    GetBreedService,
    GetProfileService,
    GetProfileByAccountIdService,
    UpdateProfileService,
    UploadImageService,
  ],
  exports: [
    CreateProfileService,
    GetBreedService,
    GetProfileService,
    GetProfileByAccountIdService,
    UpdateProfileService,
    UploadImageService,
    TypeOrmModule,
  ],
})
export class ProfileModule {}
