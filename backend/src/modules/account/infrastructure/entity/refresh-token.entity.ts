import { BaseEntity } from "../../../common";
import { Column, Entity } from "typeorm";

@Entity("refreshToken")
export class RefreshTokenOrmEntity extends BaseEntity {
  @Column()
  token!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  expiration!: number;
}
