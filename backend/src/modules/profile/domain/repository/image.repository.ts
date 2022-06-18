import { Image } from "../entity/image.entity";

export interface IImageRepository {
  findOneById: (uuid: string) => Promise<Image | null>;
  saveAndReturn: (image: Image) => Promise<Image>;
  updateAndReturn: (image: Image) => Promise<Image | null>;
  deleteOne: (uuid: string) => Promise<void>;
}
