import { Entity } from "../../../common";

interface IImage {
  uuid?: string;
  url: string;
  key: string;
}

export class Image extends Entity {
  public url!: string;
  public key!: string;

  private constructor(props: IImage, uuid?: string) {
    super(uuid);

    this.url = props.url;
    this.key = props.key;
  }

  public static create(props: IImage, uuid?: string) {
    return new Image(
      {
        url: props.url,
        key: props.key,
      },
      uuid,
    );
  }
}
