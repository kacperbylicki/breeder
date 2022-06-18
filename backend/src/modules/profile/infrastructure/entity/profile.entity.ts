import { AccountOrmEntity as Account } from "../../../account";
import { BaseEntity } from "../../../common";
import { Breed } from "../../domain/enum/breed.enum";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Gender } from "../../domain/enum/gender.enum";
import { ImageOrmEntity as Image } from "./image.entity";

@Entity("profile")
export class ProfileOrmEntity extends BaseEntity {
  @Column({ type: String })
  accountUuid!: string;

  @OneToOne(() => Account, (account: Account) => account.profile, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  account!: Account;

  @Column({ type: String })
  name!: string;

  @Column({ enum: Breed })
  breed!: Breed;

  @Column({ type: Number })
  age!: number;

  @Column({ enum: Gender })
  gender!: Gender;

  @Column({ type: String })
  location!: string;

  @OneToOne(() => Image, { eager: true, cascade: true })
  @JoinColumn()
  avatar?: Image | null;
}
