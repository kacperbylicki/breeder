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
  exports: [GetBoardService, TypeOrmModule],
  providers: [GetBoardService],
})
export class BoardModule {}
