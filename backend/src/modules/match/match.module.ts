import { CreateMatchService } from "./application/service/create-match.service";
import { GetAllMatchesService } from "./application/service/get-all-matches.service";
import { MatchController } from "./application/controller/match.controller";
import { MatchRepository } from "./infrastructure/repository/match.repository";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([MatchRepository])],
  controllers: [MatchController],
  providers: [CreateMatchService, GetAllMatchesService],
  exports: [CreateMatchService, GetAllMatchesService, TypeOrmModule],
})
export class MatchModule {}
