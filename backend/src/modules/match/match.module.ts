import { CreateMatchService } from "./application/service/create-match.service";
import { GetAllMatchesService } from "./application/service/get-all-matches.service";
import { MatchRepository } from "./infrastructure/repository/match.repository";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([MatchRepository])],
  exports: [CreateMatchService, GetAllMatchesService, TypeOrmModule],
  providers: [CreateMatchService, GetAllMatchesService, MatchRepository],
})
export class MatchModule {}
