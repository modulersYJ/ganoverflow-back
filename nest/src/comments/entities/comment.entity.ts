import { Chatpost } from "src/chatposts/entities/chatpost.entity";
import { User } from "src/user/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  commentId: number;

  @ManyToOne(() => Chatpost, (chatpost) => chatpost.comments)
  @JoinColumn({ name: "chatPostId" })
  chatPost: Chatpost;

  @ManyToOne(() => User, (user) => user.id)
  //   @JoinColumn()
  user: User;

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

  @ManyToOne(() => Comment, (parentComment) => parentComment.childComments, {
    nullable: true,
  })
  parent: Comment;

  @OneToMany(() => Comment, (childComment) => childComment.parent)
  childComments: Comment[];
}
