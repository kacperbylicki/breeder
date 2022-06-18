import { BaseEntity } from "../../../common";
import { Column, Entity } from "typeorm";

@Entity("match")
export class MatchOrmEntity extends BaseEntity {
  @Column({ type: String })
  originAccountId!: string;

  @Column({ type: String })
  targetAccountId!: string;
}
