import { Category } from "src/categories/entities/category.entity";
import { ChatPair } from "src/chat-pairs/entities/chat-pair.entity";
import { Folder } from "src/folders/entities/folder.entity";
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

  @ManyToOne(() => User, (user) => user.chatposts)
  @JoinColumn({ name: "userId" })
  userId: User;

  @ManyToOne(() => Category, (category) => category.categoryName)
  @JoinColumn({ name: "categoryName" })
  categoryName: Category;

  @Column()
  createdAt: Date;

  @Column({
    type: "enum",
    enum: ["Y" || "N"],
  })
  delYn: string;

  @ManyToOne(() => Folder, (folder) => folder.chatposts)
  folder: Folder;

  @OneToMany(() => ChatPair, (chatPair) => chatPair.chatPairId)
  chatPair: ChatPair[];
}
