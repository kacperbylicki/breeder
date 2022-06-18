import { Algorithm } from "jsonwebtoken";

export type AccessTokenSettings = {
  secret: string;
  ttl: number;
  algorithm: Algorithm;
};
