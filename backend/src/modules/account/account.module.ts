import { AccountController } from "./application/controller/account.controller";
import { AccountRepository } from "./infrastructure/repository/account.repository";
import { AccountService } from "./application/service/account.service";
import { AppConfigModule, AppConfigService } from "../../config";
import { JwtModule } from "@nestjs/jwt";
import { JwtRefreshStrategy } from "./application/strategy/jwt-refresh.strategy";
import { JwtStrategy } from "./application/strategy/jwt.strategy";
import { LocalStrategy } from "./application/strategy/local.strategy";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { RefreshTokenRepository } from "./infrastructure/repository/refresh-token.repository";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    AppConfigModule,
    PassportModule,
    TypeOrmModule.forFeature([AccountRepository]),
    TypeOrmModule.forFeature([RefreshTokenRepository]),
    JwtModule.registerAsync({
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => {
        const { secret, ttl, algorithm } = configService.getAccessTokenSettings();

        const signOptions = { expiresIn: ttl, algorithm };

        return { secret, signOptions };
      },
    }),
  ],
  controllers: [AccountController],
  providers: [AccountService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  exports: [AccountService, TypeOrmModule],
})
export class AccountModule {}
