import { IsArray, IsOptional } from "class-validator";
import { Category } from "src/categories/entities/category.entity";
import { ChatPair } from "src/chat-pairs/entities/chat-pair.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Star } from "src/stars/entities/star.entity";
import { User } from "src/user/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Chatpost {
  @PrimaryGeneratedColumn("rowid")
  chatPostId: string;

  @Column()
  chatpostName: string;

  //이렇게 명시적으로 칼럼선언해야함.
  // M-1 관계 JoinColumn 빼줌에 따른 조치
  @Column({ type: "uuid", nullable: true })
  userId: string;

  @ManyToOne(() => User, (user) => user.chatposts)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne((type) => Category)
  category: Category;

  @Column()
  createdAt: Date;

  @Column({
    type: "enum",
    enum: ["Y", "N"],
  })
  delYn: string;

  @Column({ default: 0 })
  @IsOptional()
  viewCount: number;

  @OneToMany(() => ChatPair, (chatPair) => chatPair.chatPost, {
    onDelete: "CASCADE",
  })
  chatPair: ChatPair[];

  @OneToMany(() => Comment, (comment) => comment.chatPost)
  comments: Comment[];

  @OneToMany(() => Star, (star) => star.chatPostId)
  stars: Star[];

  @Column({ type: "simple-array", nullable: true })
  @IsOptional()
  @IsArray()
  tags?: string[];
}
