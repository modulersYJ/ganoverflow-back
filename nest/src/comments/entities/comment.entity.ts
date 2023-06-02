import { Chatpost } from "src/chatposts/entities/chatpost.entity";
import { User } from "src/user/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  commentId: number;

  @ManyToOne(() => Chatpost, (chatpost) => chatpost.chatPostId)
  //   @JoinColumn()
  chatpostId: Chatpost;

  @ManyToOne(() => User, (user) => user.id)
  //   @JoinColumn()
  userId: User;

  @ManyToMany(() => User, (user) => user.id)
  @JoinTable({
    name: "comment_like",
    joinColumn: {
      name: "commentId",
      referencedColumnName: "commentId",
    },
    inverseJoinColumn: {
      name: "userId",
      referencedColumnName: "id",
    },
  })
  userLikes: User[];

  @Column()
  content: string;

  @Column()
  createdAt: Date;

  @Column()
  delYn: string;
}
