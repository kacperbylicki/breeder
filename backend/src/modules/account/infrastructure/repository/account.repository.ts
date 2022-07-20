import { Account } from "../../domain/entity/account.entity";
import { AccountMapper } from "../../application/mapper/account.mapper";
import { AccountOrmEntity } from "../entity/account.entity";
import { EntityRepository, Repository } from "typeorm";
import { IAccountRepository } from "../../domain/repository/account.repository";

@EntityRepository(AccountOrmEntity)
export class AccountRepository extends Repository<AccountOrmEntity> implements IAccountRepository {
  async findOneByEmail(email: string): Promise<Account | null> {
    const persistedAccount = await this.findOne({ email, isDeactivated: false });

    return persistedAccount ? AccountMapper.toDomain(persistedAccount) : null;
  }

  async findOneById(uuid: string): Promise<Account | null> {
    const persistedAccount = await this.findOne({ uuid, isDeactivated: false });

    return persistedAccount ? AccountMapper.toDomain(persistedAccount) : null;
  }

  async exists(email: string): Promise<boolean> {
    const persistedAccount = await this.findOne({ email });

    return !!persistedAccount;
  }

  async saveAndReturn(account: Account): Promise<Account> {
    const persistenceAccount = AccountMapper.toPersistence(account);

    const persistedAccount = await this.save(persistenceAccount);

    return AccountMapper.toDomain(persistedAccount);
  }

  async updateAndReturn(account: Account): Promise<Account | null> {
    const persistenceAccount = AccountMapper.toPersistence(account);

    await this.save(persistenceAccount);

    const updatedAccount = await this.findOne({ uuid: persistenceAccount.uuid });

    return updatedAccount ? AccountMapper.toDomain(updatedAccount) : null;
  }

  async deleteOne(uuid: string): Promise<void> {
    await this.delete({ uuid });
  }

  async deactivateOne(account: Account): Promise<void> {
    const persistenceAccount = AccountMapper.toPersistence({ ...account, isDeactivated: true });

    await this.save(persistenceAccount);
  }
}
