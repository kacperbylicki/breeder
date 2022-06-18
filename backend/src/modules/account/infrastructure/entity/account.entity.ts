import { BaseEntity } from "../../../common";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { ProfileOrmEntity as Profile } from "../../../profile/infrastructure/entity/profile.entity";

@Entity("account")
export class AccountOrmEntity extends BaseEntity {
  @Column({ unique: true })
  email!: string;

  @Column({ type: String })
  password!: string;

  @OneToOne(() => Profile, (profile) => profile.account, { eager: true, cascade: true })
  @JoinColumn()
  profile?: Profile | null;
}
