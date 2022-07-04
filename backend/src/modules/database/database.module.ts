import { AppConfigService } from "../../config";
import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: this,
      imports: [
        TypeOrmModule.forRootAsync({
          inject: [AppConfigService],
          useFactory: (configService: AppConfigService) => ({
            type: "postgres",
            url: configService.getDatabaseUrl(),
            port: configService.getDatabasePort(),
            username: configService.getDatabaseUser(),
            password: configService.getDatabasePassword(),
            database: configService.getDatabase(),
            ssl: {
              rejectUnauthorized: false,
            },
            entities: [`${__dirname}/../**/*.entity.{js,ts}`],
            synchronize: true,
          }),
        }),
      ],
      exports: [TypeOrmModule],
    };
  }
}
