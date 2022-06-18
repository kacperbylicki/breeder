import { AccountModule } from "./modules/account";
import { AppConfigModule } from "./config";
import { BoardModule } from "./modules/board/board.module";
import { DatabaseModule } from "./modules/database";
import { HealthModule } from "./modules/health";
import { LoggerModule } from "nestjs-pino";
import { MatchModule } from "./modules/match";
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
    ProfileModule,
    ReactionModule,
    BoardModule,
  ],
})
export class AppModule {}
