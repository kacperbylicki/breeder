import { Column, PrimaryGeneratedColumn, Timestamp } from "typeorm";

export class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid!: string;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Timestamp;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Timestamp;
}
