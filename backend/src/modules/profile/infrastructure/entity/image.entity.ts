import { BaseEntity } from "../../../common";
import { Column, Entity } from "typeorm";

@Entity("image")
export class ImageOrmEntity extends BaseEntity {
  @Column({ type: String })
  url!: string;

  @Column({ type: String })
  key!: string;
}
