import { IsOptional } from "class-validator";
import { Category } from "src/categories/entities/category.entity";
import { ChatPair } from "src/chat-pairs/entities/chat-pair.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Star } from "src/stars/entities/star.entity";
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
export class Chatpost {
  @PrimaryGeneratedColumn("rowid")
  chatPostId: string;

  @Column()
  chatpostName: string;

  @ManyToOne(() => User, (user) => user.chatposts)
  @JoinColumn({ name: "userId" })
  userId: User;

  @ManyToOne(() => Category, (category) => category.categoryName, {
    nullable: true,
  })
  @JoinColumn({ name: "categoryName" })
  categoryName: Category;

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
}
