import { Chatpost } from "src/chatposts/entities/chatpost.entity";
import { User } from "src/user/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";


// export enum StarValue {
//   MinusOne = -1,
//   Zero = 0,
//   One = 1,
// }

@Entity()
export class Star {
  @PrimaryGeneratedColumn()
  starId: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userid" })
  user: User;

  @ManyToOne(() => Chatpost, (chatpost) => chatpost.chatPostId)
  @JoinColumn({ name: "chatpostid" })
  chatPostId: Chatpost;

  @Column({
    type: "enum",
    enum: [-1, 0, 1],
  })
  value: number;
}
