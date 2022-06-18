import { ApiBearerAuth, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CreateReactionDTO } from "../dto/create-reaction.dto";
import { CreateReactionService } from "../service/create-reaction.service";
import { JwtAuthGuard, RequestAccount } from "../../../account";
import { Match } from "../../../match";
import { PasswordlessAccount } from "../../../account";
import { Reaction } from "../../domain/entity/reaction.entity";
import { TimeoutInterceptor, TransformInterceptor } from "../../../common";

@Controller("reactions")
@ApiTags(ReactionController.name)
@UseInterceptors(TimeoutInterceptor, TransformInterceptor)
export class ReactionController {
  constructor(private readonly createReactionService: CreateReactionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiUnauthorizedResponse({ description: `Invalid token` })
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a reaction" })
  async createReaction(
    @Body() reaction: CreateReactionDTO,
    @RequestAccount() account: PasswordlessAccount,
  ): Promise<Reaction | Match> {
    return this.createReactionService.execute({ data: reaction, account });
  }
}
