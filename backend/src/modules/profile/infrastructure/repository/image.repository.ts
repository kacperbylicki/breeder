import { EntityRepository, Repository } from "typeorm";
import { IImageRepository } from "../../domain/repository/image.repository";
import { Image } from "../../domain/entity/image.entity";
import { ImageMapper } from "../../application/mapper/image.mapper";
import { ImageOrmEntity } from "../entity/image.entity";

@EntityRepository(ImageOrmEntity)
export class ImageRepository extends Repository<ImageOrmEntity> implements IImageRepository {
  async findOneById(uuid: string): Promise<Image | null> {
    const persistedImage = await this.findOne({ uuid });

    return persistedImage ? ImageMapper.toDomain(persistedImage) : null;
  }

  async saveAndReturn(image: Image): Promise<Image> {
    const persistenceImage = ImageMapper.toPersistence(image);

    const persistedImage = await this.save(persistenceImage);

    return ImageMapper.toDomain(persistedImage);
  }

  async updateAndReturn(image: Image): Promise<Image | null> {
    const persistenceImage = ImageMapper.toPersistence(image);

    await this.update({ uuid: persistenceImage.uuid }, persistenceImage);

    const updatedImage = await this.findOne({ uuid: persistenceImage.uuid });

    return updatedImage ? ImageMapper.toDomain(updatedImage) : null;
  }

  async deleteOne(uuid: string): Promise<void> {
    await this.delete({ uuid });
  }
}
