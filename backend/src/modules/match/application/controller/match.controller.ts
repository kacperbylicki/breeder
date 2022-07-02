import { ApiBearerAuth, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Controller, Get, HttpCode, HttpStatus, UseGuards, UseInterceptors } from "@nestjs/common";
import { GetAllMatchesService } from "../service/get-all-matches.service";
import { JwtAuthGuard, PasswordlessAccount, RequestAccount } from "../../../account";
import { Match } from "../../domain/entity/match.entity";
import { TimeoutInterceptor, TransformInterceptor } from "../../../common";

@Controller("matches")
@ApiTags(MatchController.name)
@UseInterceptors(TimeoutInterceptor, TransformInterceptor)
export class MatchController {
  constructor(private readonly getMatchesService: GetAllMatchesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ description: `Invalid token` })
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get matches" })
  async getMatches(@RequestAccount() account: PasswordlessAccount): Promise<Match[]> {
    return this.getMatchesService.execute(account.uuid);
  }
}
