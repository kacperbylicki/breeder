import { AppConfigService } from "../../config";
import { DynamicModule, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: this,
      imports: [
        MongooseModule.forRootAsync({
          inject: [AppConfigService],
          useFactory: (configService: AppConfigService) => ({
            uri: configService.getDatabaseUri(),
          }),
        }),
      ],
      exports: [MongooseModule],
    };
  }
}
