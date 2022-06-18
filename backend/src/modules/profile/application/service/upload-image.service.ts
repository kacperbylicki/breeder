import { AppConfigService } from "../../../../config";
import { BaseService } from "../../../common";
import { Image } from "../../domain/entity/image.entity";
import { ImageDTO } from "../dto/image.dto";
import { ImageMapper } from "../mapper/image.mapper";
import { ImageRepository } from "../../infrastructure/repository/image.repository";
import { Inject, Injectable } from "@nestjs/common";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { S3 } from "aws-sdk";
import { v4 as uuid } from "uuid";

type UploadImagePayload = { data: ImageDTO; filename: string };

@Injectable()
export class UploadImageService implements BaseService<UploadImagePayload, Image> {
  constructor(
    private readonly imageRepository: ImageRepository,
    @Inject("S3_CLIENT") private readonly s3Client: S3,
    private readonly configService: AppConfigService,
  ) {}

  async execute({ data, filename }: UploadImagePayload): Promise<Image> {
    const params: PutObjectRequest = {
      Bucket: this.configService.getImagesBucket(),
      Key: `${uuid()}-${filename}`,
      Body: data.buffer,
      ACL: "public-read",
      ContentType: data.mimetype,
    };

    const uploadResult = await this.s3Client.upload(params).promise();

    const image = ImageMapper.toDomain({
      url: uploadResult.Location,
      key: uploadResult.Key,
    });

    return this.imageRepository.saveAndReturn(image);
  }
}
