import { Account } from "../../domain/entity/account.entity";
import { Account as AccountModel } from "../../infrastructure/entity/account.model";

export class AccountMapper {
  static toDomain(raw: any): Account {
    return Account.create(raw, raw.uuid);
  }

  static toPersistence(account: Account): AccountModel {
    const accountData = {
      uuid: account.uuid,
      email: account.email,
      username: account.username,
      password: account.password,
      gender: account.gender,
    };

    return accountData;
  }
}
