import { Chatpost } from "src/chatposts/entities/chatpost.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ChatPair {
  @PrimaryGeneratedColumn()
  chatPairId: number;

  @Column()
  question: string;
  @Column()
  answer: string;
  @Column()
  order: number;

  @ManyToOne(() => Chatpost, (chatPost) => chatPost.chatPair, {
    onDelete: "CASCADE",
  })
  chatPost: Chatpost;
}
