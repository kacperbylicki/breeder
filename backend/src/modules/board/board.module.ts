import { BoardController, GetBoardService } from ".";
import { MatchRepository } from "../match";
import { Module } from "@nestjs/common";
import { ProfileRepository } from "../profile";
import { ReactionRepository } from "../reaction";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([ReactionRepository]),
    TypeOrmModule.forFeature([MatchRepository]),
    TypeOrmModule.forFeature([ProfileRepository]),
  ],
  controllers: [BoardController],
  providers: [GetBoardService],
  exports: [GetBoardService, TypeOrmModule],
})
export class BoardModule {}
