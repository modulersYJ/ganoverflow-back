import { Chatpost } from "src/chatposts/entities/chatpost.entity";
import {
  Column,
  Entity,
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

  @OneToMany(() => Chatpost, (chatpost) => chatpost.chatPostId)
  chatposts: Chatpost[];
}
