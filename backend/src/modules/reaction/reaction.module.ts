import { CreateMatchService, MatchRepository } from "../match";
import { CreateReactionService } from "./application/service/create-reaction.service";
import { Module } from "@nestjs/common";
import { ReactionRepository } from "./infrastructure/repository/reaction.repository";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([MatchRepository]),
    TypeOrmModule.forFeature([ReactionRepository]),
  ],
  providers: [CreateReactionService, CreateMatchService],
  exports: [CreateReactionService, TypeOrmModule],
})
export class ReactionModule {}
