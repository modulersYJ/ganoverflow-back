import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ synchronize: false, name: "categorytoptags" })
export class CategoryTopTags {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  categoryName: string;

  @Column()
  tag: string;

  @Column()
  frequency: number;
}
