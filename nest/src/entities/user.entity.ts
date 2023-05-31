import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@Entity()
@Unique(["username"]) // 'username'는 unique해야 함
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({ length: 150, default: "user123" })
  username: string;

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
}
