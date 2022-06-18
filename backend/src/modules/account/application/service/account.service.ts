import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { Account } from "../../domain/entity/account.entity";
import { AccountMapper } from "../mapper/account.mapper";
import { AccountRepository } from "../../infrastructure/repository/account.repository";
import { AppConfigService } from "../../../../config";
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PasswordlessAccount } from "../../domain/type/passwordless-account.type";
import { RefreshToken } from "../../domain/entity/refresh-token.entity";
import { RefreshTokenMapper } from "../mapper/refresh-token.mapper";
import { RefreshTokenRepository } from "../../infrastructure/repository/refresh-token.repository";
import { RegisterDTO } from "../dto/register.dto";
import { Tokens } from "../../domain/type/tokens.type";

@Injectable()
export class AccountService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: AppConfigService,
    private readonly accountRepository: AccountRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  private async createTokensPair(account: PasswordlessAccount): Promise<Tokens> {
    const { secret: accessTokenSecret, ttl: accessTokenTTL } =
      this.configService.getAccessTokenSettings();

    const { secret: refreshTokenSecret, ttl: refreshTokenTTL } =
      this.configService.getRefreshTokenSettings();

    const accessToken = await this.jwtService.signAsync(account, {
      secret: accessTokenSecret,
      expiresIn: accessTokenTTL,
    });

    const refreshToken = await this.jwtService.signAsync(account, {
      secret: refreshTokenSecret,
      expiresIn: refreshTokenTTL,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private async getPersistenceRefreshToken(email: string, token: string): Promise<RefreshToken> {
    const hashedRefreshToken = await bcrypt.hash(token, 10);
    const { ttl: refreshTokenTTL } = this.configService.getRefreshTokenSettings();

    const refreshToken = RefreshTokenMapper.toDomain({
      token: hashedRefreshToken,
      email,
      expiration: dayjs().add(refreshTokenTTL, "s").unix(),
    });

    return refreshToken;
  }

  async findByEmail(email: string): Promise<Account | null> {
    const persistedAccount = await this.accountRepository.findOneByEmail(email);

    return persistedAccount ? AccountMapper.toDomain(persistedAccount) : null;
  }

  async authenticateWithCredentials(account: PasswordlessAccount): Promise<Tokens> {
    const { accessToken: accessTokenStr, refreshToken: refreshTokenStr } =
      await this.createTokensPair(account);

    const persistenceRefreshToken = await this.getPersistenceRefreshToken(
      account.email,
      refreshTokenStr,
    );

    await this.refreshTokenRepository.upsertAndReturn(persistenceRefreshToken);

    return {
      accessToken: accessTokenStr,
      refreshToken: refreshTokenStr,
    };
  }

  async authenticateWithRefreshToken(account: PasswordlessAccount, token: string): Promise<Tokens> {
    const persistedRefreshTokenData = await this.refreshTokenRepository.findOneByEmail(
      account.email,
    );

    if (!persistedRefreshTokenData) {
      throw new UnauthorizedException();
    }

    const isRefreshTokenMatching = await bcrypt.compare(token, persistedRefreshTokenData.token);

    if (!isRefreshTokenMatching) {
      throw new UnauthorizedException();
    }

    const { accessToken: accessTokenStr, refreshToken: refreshTokenStr } =
      await this.createTokensPair(account);

    const refreshToken = await this.getPersistenceRefreshToken(account.email, refreshTokenStr);

    await this.refreshTokenRepository.upsertAndReturn(refreshToken);

    return {
      accessToken: accessTokenStr,
      refreshToken: refreshTokenStr,
    };
  }

  async register(data: RegisterDTO): Promise<Account> {
    const accountExists = await this.accountRepository.exists(data.email);

    if (accountExists) {
      throw new ConflictException("Account already exists");
    }

    if (data.password !== data.confirmPassword) {
      throw new UnprocessableEntityException("Passwords not match");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const account = AccountMapper.toDomain({ ...data, password: hashedPassword });

    return this.accountRepository.saveAndReturn(account);
  }

  async logout(account: PasswordlessAccount): Promise<void> {
    await this.refreshTokenRepository.deleteOne(account.email);
  }
}
