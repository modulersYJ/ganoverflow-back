import { Category } from "src/categories/entities/category.entity";
import { Chatpost } from "src/chatposts/entities/chatpost.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Follow } from "src/follows/entities/follow.entity";
import { Star } from "src/stars/entities/star.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@Entity()
@Unique(["username"]) // 'username'는 unique해야 함
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ length: 150, default: "user123" })
  username: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({ length: 150, nullable: true }) // false 여야 하는데 에러남. 디비 함 밀어야 할듯.
  email: string;

  @Column({ length: 100 })
  nickname: string;

  @Column({
    type: "enum",
    enum: ["N", "R", "S"],
    default: "N",
  })
  status: string;

  @Column({
    type: "enum",
    enum: ["M", "F", "N"],
    default: "N",
    nullable: true,
  })
  gender: string;

  @Column({ type: "date", nullable: true })
  birth_date: Date;

  // @Column({ default: "+8210-0000-0000" })
  // phone_num: string;

  @Column({
    type: "enum",
    enum: ["Y", "N"],
    default: "N",
  })
  svc_use_pcy_agmt: string;

  @Column({
    type: "enum",
    enum: ["Y", "N"],
    default: "N",
  })
  ps_info_proc_agmt: string;

  @Column({
    type: "enum",
    enum: ["Y", "N"],
    default: "N",
  })
  mkt_info_recv_agmt: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ length: 50, nullable: true })
  provider: string;

  @Column({ length: 200, nullable: true })
  social_id: string;

  @OneToMany(() => Chatpost, (chatpost) => chatpost.userId)
  @JoinColumn({ name: "chatpostId" })
  chatposts: Chatpost[];

  @OneToMany(() => Comment, (comment) => comment.userId)
  @JoinColumn({ name: "commentId" })
  comments: Comment[];

  @OneToMany(() => Follow, (follow) => follow.followId)
  @JoinColumn({ name: "followerId" })
  followerId: Follow[];

  @OneToMany(() => Follow, (follow) => follow.followId)
  @JoinColumn({ name: "followeeId" })
  followeeId: Follow[];
}
