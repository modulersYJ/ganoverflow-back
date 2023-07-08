import { Chatpost } from "src/chatposts/entities/chatpost.entity";
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
export class Folder {
  @PrimaryGeneratedColumn()
  folderId: number;

  @Column()
  folderName: string;

  @Column()
  order: number;

  @Column() // UserId column 추가
  userId: string;

  @ManyToOne(() => User, (user) => user.folders)
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => Chatpost, (chatpost) => chatpost.folder, {
    nullable: true,
  })
  chatposts: Chatpost[];
}
