import { Chatpost } from "src/chatposts/entities/chatpost.entity";
import { User } from "src/user/entities/user.entity";
import {
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

@Entity()
export class Category {
  @PrimaryColumn()
  categoryName: string;

  @OneToMany(() => Chatpost, (chatpost) => chatpost.category)
  chatposts: Chatpost[];

  @ManyToMany(() => User)
  @JoinTable({
    name: "favorite_category",
    joinColumn: {
      name: "categoryName",
      referencedColumnName: "categoryName",
    },
    inverseJoinColumn: {
      name: "userId",
      referencedColumnName: "id",
    },
  })
  users: User[];
}
