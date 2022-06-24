import { CreateMatchService, MatchRepository } from "../match";
import { CreateReactionService } from "./application/service/create-reaction.service";
import { GetReactionsService } from "./application/service/get-reactions.service";
import { Module } from "@nestjs/common";
import { ReactionController } from "./application/controller/reaction.controller";
import { ReactionRepository } from "./infrastructure/repository/reaction.repository";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([MatchRepository]),
    TypeOrmModule.forFeature([ReactionRepository]),
  ],
  controllers: [ReactionController],
  providers: [CreateReactionService, GetReactionsService, CreateMatchService],
  exports: [CreateReactionService, GetReactionsService, TypeOrmModule],
})
export class ReactionModule {}
