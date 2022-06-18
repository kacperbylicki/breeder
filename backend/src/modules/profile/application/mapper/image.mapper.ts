import { Image } from "../../domain/entity/image.entity";
import { ImageOrmEntity } from "../../infrastructure/entity/image.entity";

export class ImageMapper {
  static toDomain(raw: any): Image {
    return Image.create(raw, raw.uuid);
  }

  static toPersistence(image: Image): ImageOrmEntity {
    const persistenceImage = new ImageOrmEntity();

    persistenceImage.uuid = image.uuid;
    persistenceImage.url = image.url;
    persistenceImage.key = image.key;

    return persistenceImage;
  }
}
