import { CreateMatchService } from "./application/service/create-match.service";
import { GetAllMatchesService } from "./application/service/get-all-matches.service";
import { MatchRepository } from "./infrastructure/repository/match.repository";
import { Module } from "@nestjs/common";

@Module({
  exports: [CreateMatchService, GetAllMatchesService],
  providers: [CreateMatchService, GetAllMatchesService, MatchRepository],
})
export class MatchModule {}
