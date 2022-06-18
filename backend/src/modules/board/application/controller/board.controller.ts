import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Controller, Get, HttpCode, HttpStatus, UseGuards, UseInterceptors } from "@nestjs/common";
import { GetBoardService } from "../service/get-board.service";
import { JwtAuthGuard, PasswordlessAccount, RequestAccount } from "../../../account";
import { Profile } from "../../../profile";
import { TimeoutInterceptor, TransformInterceptor } from "../../../common";

@Controller("board")
@ApiTags(BoardController.name)
@UseInterceptors(TimeoutInterceptor, TransformInterceptor)
export class BoardController {
  constructor(private readonly getBoardService: GetBoardService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ description: `Invalid token` })
  @ApiBearerAuth()
  async getBoard(@RequestAccount() account: PasswordlessAccount): Promise<Profile[]> {
    return this.getBoardService.execute(account.uuid);
  }
}
