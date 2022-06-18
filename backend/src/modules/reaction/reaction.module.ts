import { CreateMatchService, MatchRepository } from "../match";
import { CreateReactionService } from "./application/service/create-reaction.service";
import { Module } from "@nestjs/common";
import { ReactionRepository } from "./infrastructure/repository/reaction.repository";

@Module({
  imports: [CreateMatchService],
  exports: [CreateReactionService],
  providers: [CreateReactionService, MatchRepository, ReactionRepository],
})
export class ReactionModule {}
