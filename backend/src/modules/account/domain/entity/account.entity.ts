import { Entity } from "../../../common";
import { Profile } from "../../../profile";
import { ProfileMapper } from "../../../profile/application/mapper/profile.mapper";

interface IAccount {
  uuid?: string;
  email: string;
  password: string;
  profile: Profile | null;
  isDeactivated: boolean;
}

export class Account extends Entity {
  public email!: string;
  public password!: string;
  public profile!: Profile | null;
  public isDeactivated!: boolean;

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
        isDeactivated: props.isDeactivated ?? false,
      },
      uuid,
    );
  }
}
