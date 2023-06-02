import { User } from "src/user/entities/user.entity";
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  followId: number;

  @ManyToOne(() => User, (user) => user.followerId)
  @JoinColumn()
  followerId: User;

  @ManyToOne(() => User, (user) => user.followeeId)
  @JoinColumn()
  followeeId: User;
}
