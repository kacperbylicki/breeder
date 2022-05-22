import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { JwtAuthGuard } from "../guard/jwt.guard";
import { LocalAuthGuard } from "../guard/local.guard";
import { PasswordlessAccount } from "../../domain/type/passwordless-account.type";

export const RequestAccount = createParamDecorator((_: any, ctx: ExecutionContext) => {
  const account = ctx.switchToHttp().getRequest()?.user;

  if (!account) {
    throw new TypeError(
      `Current user could not be found on request object. Did you add the ${JwtAuthGuard.name}, or ${LocalAuthGuard.name} to the controller method?`,
    );
  }

  return account as PasswordlessAccount;
});
