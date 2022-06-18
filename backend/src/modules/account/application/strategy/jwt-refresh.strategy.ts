import omit from "lodash.omit";
import { AccountService } from "../service/account.service";
import { AppConfigService } from "../../../../config";
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "jsonwebtoken";
import { PassportStrategy } from "@nestjs/passport";
import { PasswordlessAccount } from "../../domain/type/passwordless-account.type";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor(
    protected readonly configService: AppConfigService,
    private readonly accountService: AccountService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField("refreshToken"),
      secretOrKey: configService.getRefreshTokenSettings("secret"),
    });
  }

  async validate(payload: JwtPayload): Promise<PasswordlessAccount> {
    if (!payload) {
      throw new BadRequestException();
    }

    const account = await this.accountService.findByEmail(payload?.email);

    if (!account) {
      throw new UnauthorizedException();
    }

    return omit(account, [`password`]);
  }
}
