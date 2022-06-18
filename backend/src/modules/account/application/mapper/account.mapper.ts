import { Account } from "../../domain/entity/account.entity";
import { AccountOrmEntity } from "../../infrastructure/entity/account.entity";

export class AccountMapper {
  static toDomain(raw: any): Account {
    return Account.create(raw, raw.uuid);
  }

  static toPersistence(account: Account): AccountOrmEntity {
    const persistenceAccount = new AccountOrmEntity();

    persistenceAccount.uuid = account.uuid;
    persistenceAccount.email = account.email;
    persistenceAccount.password = account.password;

    return persistenceAccount;
  }
}
