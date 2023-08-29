import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ synchronize: false })
export class CategoryTopTags {
  @PrimaryGeneratedColumn()
  Id: string;

  @Column()
  categoryName: string;

  @Column()
  tag: string;

  @Column()
  frequency: number;
}
