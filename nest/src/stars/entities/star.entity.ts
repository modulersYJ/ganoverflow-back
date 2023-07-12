import { Chatpost } from "src/chatposts/entities/chatpost.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Star {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userId" })
  userId: User;

  @ManyToOne(() => Chatpost, (chatpost) => chatpost.chatPostId)
  @JoinColumn({ name: "chatPostId" })
  chatPostId: Chatpost;
}
