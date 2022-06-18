import { Breed } from "../enum/breed.enum";
import { Entity } from "../../../common";
import { Gender } from "../enum/gender.enum";
import { Image } from "./image.entity";

interface IProfile {
  uuid?: string;
  name: string;
  breed: Breed;
  age: number;
  gender: Gender;
  location: string;
  avatar: Image;
}

export class Profile extends Entity {
  public name!: string;
  public breed!: Breed;
  public age!: number;
  public gender!: Gender;
  public location!: string;
  public avatar!: Image;

  private constructor(props: IProfile, uuid?: string) {
    super(uuid);

    this.name = props.name;
    this.breed = props.breed;
    this.age = props.age;
    this.gender = props.gender;
    this.location = props.location;
    this.avatar = props.avatar;
  }

  public static create(props: IProfile, uuid?: string): Profile {
    return new Profile(
      {
        name: props.name,
        breed: Breed[props.breed],
        age: props.age,
        gender: Gender[props.gender],
        location: props.location,
        avatar: props.avatar,
      },
      uuid,
    );
  }
}
