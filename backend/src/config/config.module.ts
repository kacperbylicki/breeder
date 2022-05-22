import { AppConfigService } from "./application/service/config.service";
import { ConfigModule } from "@nestjs/config";
import { DynamicModule, Global, Module, NestModule } from "@nestjs/common";
import { validate } from "./application/validator/config.validator";

@Global()
@Module({})
export class AppConfigModule implements NestModule {
  static forRoot(): DynamicModule {
    return {
      module: AppConfigModule,
      imports: [ConfigModule.forRoot({ validate })],
      providers: [AppConfigService],
      exports: [AppConfigService],
      global: true,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  configure() {}
}
