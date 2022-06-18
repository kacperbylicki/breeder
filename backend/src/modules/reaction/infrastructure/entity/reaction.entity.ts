import { BaseEntity } from "../../../common";
import { Column, Entity } from "typeorm";
import { ReactionType } from "../../domain/enum/reaction-type.enum";

@Entity("reaction")
export class ReactionOrmEntity extends BaseEntity {
  @Column({ enum: ReactionType })
  type!: ReactionType;

  @Column({ type: String })
  originAccountId!: string;

  @Column({ type: String })
  targetAccountId!: string;
}
