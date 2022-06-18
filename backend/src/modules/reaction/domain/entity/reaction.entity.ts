import { Entity } from "../../../common";
import { ReactionType } from "../enum/reaction-type.enum";

interface IReaction {
  uuid?: string;
  type: ReactionType;
  originAccountId: string;
  targetAccountId: string;
}

export class Reaction extends Entity {
  public type!: ReactionType;
  public originAccountId!: string;
  public targetAccountId!: string;

  private constructor(props: IReaction, uuid?: string) {
    super(uuid);

    this.type = props.type;
    this.originAccountId = props.originAccountId;
    this.targetAccountId = props.targetAccountId;
  }

  public static create(props: IReaction, uuid?: string): Reaction {
    return new Reaction(
      {
        type: ReactionType[props.type],
        originAccountId: props.originAccountId,
        targetAccountId: props.targetAccountId,
      },
      uuid,
    );
  }
}
