import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CreateProfileDTO } from "../dto/create-profile.dto";
import { CreateProfileService } from "../service/create-profile.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { GetProfileByAccountIdService } from "../service/get-profile-by-account-id.service";
import { GetProfileService } from "../service/get-profile.service";
import { ImageDTO } from "../dto/image.dto";
import { JwtAuthGuard, PasswordlessAccount, RequestAccount } from "../../../account";
import { Profile } from "../../domain/entity/profile.entity";
import { TimeoutInterceptor, TransformInterceptor } from "../../../common";
import { UpdateProfileDTO } from "../dto/update-profile.dto";
import { UpdateProfileService } from "../service/update-profile.service";

@Controller("profiles")
@ApiTags(ProfileController.name)
@UseInterceptors(TimeoutInterceptor, TransformInterceptor)
export class ProfileController {
  constructor(
    private readonly createProfileService: CreateProfileService,
    private readonly updateProfileService: UpdateProfileService,
    private readonly getProfileService: GetProfileService,
    private readonly getProfileByAccountIdService: GetProfileByAccountIdService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiUnauthorizedResponse({ description: `Invalid token` })
  @UseInterceptors(FileInterceptor("image", { limits: { files: 1 } }))
  @ApiBearerAuth()
  async createProfile(
    @Body() profile: CreateProfileDTO,
    @RequestAccount() account: PasswordlessAccount,
    @UploadedFile() image?: ImageDTO,
  ): Promise<Profile> {
    return this.createProfileService.execute({ data: profile, account, image });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ description: `Invalid token` })
  @UseInterceptors(FileInterceptor("image", { limits: { files: 1 } }))
  @ApiBearerAuth()
  async updateProfile(
    @Body() profile: UpdateProfileDTO,
    @RequestAccount() account: PasswordlessAccount,
    @UploadedFile() image?: ImageDTO,
  ): Promise<Profile | null> {
    return this.updateProfileService.execute({ data: profile, account, image });
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ description: `Invalid token` })
  @ApiBearerAuth()
  async getCurrentUserProfile(
    @RequestAccount() account: PasswordlessAccount,
  ): Promise<Profile | null> {
    return this.getProfileByAccountIdService.execute(account.uuid);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ description: `Invalid token` })
  @ApiBearerAuth()
  async getProfile(@Param("id") profileId: string): Promise<Profile | null> {
    return this.getProfileService.execute(profileId);
  }
}
