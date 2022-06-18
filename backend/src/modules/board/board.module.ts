import { BoardController, GetBoardService } from ".";
import { MatchRepository } from "../match";
import { Module } from "@nestjs/common";
import { ProfileRepository } from "../profile";
import { ReactionRepository } from "../reaction";

@Module({
  controllers: [BoardController],
  exports: [GetBoardService],
  providers: [GetBoardService, ReactionRepository, MatchRepository, ProfileRepository],
})
export class BoardModule {}
