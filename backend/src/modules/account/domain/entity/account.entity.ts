import { Entity } from "../../../common/domain/entity/base.entity";
import { Profile } from "../../../profile";
import { ProfileMapper } from "../../../profile/application/mapper/profile.mapper";

interface IAccount {
  uuid?: string;
  email: string;
  password: string;
  profile: Profile | null;
}

export class Account extends Entity {
  public email!: string;
  public password: string;
  public profile: Profile | null;

  private constructor(props: IAccount, uuid?: string) {
    super(uuid);

    this.email = props.email;
    this.password = props.password;
    this.profile = props.profile;
  }

  public static create(props: IAccount, uuid?: string) {
    return new Account(
      {
        email: props.email,
        password: props.password,
        profile: props.profile ? ProfileMapper.toDomain(props.profile) : null,
      },
      uuid,
    );
  }
}
