import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  ObjectID,
  ObjectIdColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./Post.entity";
import { User } from "./User.entity";
@Entity()
export class Reviews {
  @ObjectIdColumn()
  _id: ObjectID;
  @Column()
  comment: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "dt_create",
  })
  public created_at: Date;
  @Column()
  // @JoinTable()
  user: User;
  @Column()
  product: Post;
}
