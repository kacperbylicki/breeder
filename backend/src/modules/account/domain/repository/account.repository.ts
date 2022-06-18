import { Account } from "../entity/account.entity";
import { Repository } from "../../../common/domain/repository/base.repository";

export interface IAccountRepository extends Repository<Account> {
  findOneByEmail: (email: string) => Promise<Account | null>;
}
