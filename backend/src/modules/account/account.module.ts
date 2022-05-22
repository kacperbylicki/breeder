import { AccountController } from "./application/controller/account.controller";
import { AccountRepository } from "./infrastructure/repository/account.repository";
import { AccountService } from "./application/service/account.service";
import { Algorithm } from "jsonwebtoken";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { JwtRefreshStrategy } from "./application/strategy/jwt-refresh.strategy";
import { JwtStrategy } from "./application/strategy/jwt.strategy";
import { LocalStrategy } from "./application/strategy/local.strategy";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { RefreshTokenRepository } from "./infrastructure/repository/refresh-token.repository";

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>("accessToken.secret");
        const expiresInSec = config.get<number>("accessToken.ttl");
        const algorithm = config.get<Algorithm>("accessToken.algorithm");

        const signOptions = { expiresIn: expiresInSec, algorithm: algorithm };

        return { secret, signOptions };
      },
    }),
  ],
  controllers: [AccountController],
  providers: [
    AccountService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    AccountRepository,
    RefreshTokenRepository,
  ],
  exports: [AccountService],
})
export class AccountModule {}
