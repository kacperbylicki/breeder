import { Algorithm } from "jsonwebtoken";

export type RefreshTokenSettings = {
  secret: string;
  ttl: number;
  algorithm: Algorithm;
};
