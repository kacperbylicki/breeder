import { AccountModule } from "./modules/account";
import { AppConfigModule } from "./config";
import { DatabaseModule } from "./modules/database";
import { HealthModule } from "./modules/health";
import { LoggerModule } from "nestjs-pino";
import { MatchModule } from "./modules/match";
import { MessageModule } from "./modules/message";
import { Module } from "@nestjs/common";
import { ProfileModule } from "./modules/profile";
import { ReactionModule } from "./modules/reaction";

@Module({
  imports: [
    DatabaseModule.forRoot(),
    LoggerModule.forRoot(),
    AppConfigModule.forRoot(),
    AccountModule,
    HealthModule,
    MatchModule,
    MessageModule,
    ProfileModule,
    ReactionModule,
  ],
})
export class AppModule {}
