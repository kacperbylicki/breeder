import { BaseService } from "../../../common";
import { CreateMatchDTO } from "../dto/create-match.dto";
import { Injectable } from "@nestjs/common";
import { Match } from "../../domain/entity/match.entity";
import { MatchMapper } from "../mapper/match.mapper";
import { MatchRepository } from "../../infrastructure/repository/match.repository";

@Injectable()
export class CreateMatchService implements BaseService<CreateMatchDTO, Match> {
  constructor(private readonly matchRepository: MatchRepository) {}

  async execute(data: CreateMatchDTO): Promise<Match> {
    const match = MatchMapper.toDomain(data);

    return this.matchRepository.saveAndReturn(match);
  }
}
