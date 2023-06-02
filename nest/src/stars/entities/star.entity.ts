import { Chatpost } from "src/chatposts/entities/chatpost.entity";
import { User } from "src/user/entities/user.entity";
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

@Entity()
export class Star {
  @PrimaryColumn()
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userId" })
  userId: User;

  @PrimaryColumn()
  @ManyToOne(() => Chatpost, (chatpost) => chatpost.chatPostId)
  @JoinColumn({ name: "chatPostId" })
  chatPostId: Chatpost;
}
