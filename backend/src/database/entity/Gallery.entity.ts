import { Column, Entity, ManyToOne, ObjectID, ObjectIdColumn } from "typeorm";
import { Post } from "./Post.entity";

@Entity()
export class Gallery {
  @ObjectIdColumn()
  _id: ObjectID;
  @Column()
  url: string;
  @Column()
  isImage: boolean;
}
