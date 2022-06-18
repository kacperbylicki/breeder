import { Entity } from "../../../common";

interface IMatch {
  uuid?: string;
  originAccountId: string;
  targetAccountId: string;
}

export class Match extends Entity {
  public originAccountId!: string;
  public targetAccountId!: string;

  private constructor(props: IMatch, uuid?: string) {
    super(uuid);

    this.originAccountId = props.originAccountId;
    this.targetAccountId = props.targetAccountId;
  }

  public static create(props: IMatch, uuid?: string): Match {
    return new Match(
      {
        originAccountId: props.originAccountId,
        targetAccountId: props.targetAccountId,
      },
      uuid,
    );
  }
}
