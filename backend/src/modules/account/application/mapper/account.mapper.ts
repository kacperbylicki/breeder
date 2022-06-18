import { Account } from "../../domain/entity/account.entity";
import { AccountOrmEntity } from "../../infrastructure/entity/account.entity";
import { ProfileMapper } from "../../../profile/application/mapper/profile.mapper";

export class AccountMapper {
  static toDomain(raw: any): Account {
    return Account.create(raw, raw.uuid);
  }

  static toPersistence(account: Account): AccountOrmEntity {
    const persistenceAccount = new AccountOrmEntity();
    const persistenceProfile = account.profile
      ? ProfileMapper.toPersistence(account.profile, account.uuid)
      : null;

    persistenceAccount.uuid = account.uuid;
    persistenceAccount.email = account.email;
    persistenceAccount.password = account.password;
    persistenceAccount.profile = persistenceProfile;

    return persistenceAccount;
  }
}
