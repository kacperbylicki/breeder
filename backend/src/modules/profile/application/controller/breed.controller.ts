import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Breed } from "../../domain/enum/breed.enum";
import { Controller, Get, HttpCode, HttpStatus, UseGuards, UseInterceptors } from "@nestjs/common";
import { GetBreedService } from "../service/get-breed.service";
import { JwtAuthGuard } from "../../../account";
import { TimeoutInterceptor, TransformInterceptor } from "../../../common";

@Controller("breeds")
@ApiTags(BreedController.name)
@UseInterceptors(TimeoutInterceptor, TransformInterceptor)
export class BreedController {
  public constructor(private readonly getBreedService: GetBreedService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ description: `Invalid token` })
  @ApiBearerAuth()
  async getBreeds(): Promise<Breed[]> {
    return this.getBreedService.execute();
  }
}
