import { Entity } from "../../../common/domain/entity/base.entity";
import { Profile } from "../../../profile";

interface IAccount {
  uuid?: string;
  email: string;
  password: string;
  profile: Profile;
}

export class Account extends Entity {
  public email!: string;
  public password: string;
  public profile!: Profile;

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
        profile: props.profile ?? null,
      },
      uuid,
    );
  }
}
