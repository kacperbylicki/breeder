import { Account } from "../entity/account.entity";

export type PasswordlessAccount = Omit<Account, "password">;
