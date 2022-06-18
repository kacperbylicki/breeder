import { BaseService } from "../../../common";
import { Breed } from "../../domain/enum/breed.enum";

export class GetBreedService implements BaseService<void, Breed[]> {
  async execute(): Promise<Breed[]> {
    return Object.values(Breed);
  }
}
