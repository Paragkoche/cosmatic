import {
  Entity,
  Column,
  ObjectID,
  ObjectIdColumn,
  BeforeInsert,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User.entity";

@Entity()
export class Post {
  @ObjectIdColumn()
  _id: ObjectID;
  @Column({ type: "varchar" })
  longDescription: string;
  @Column({ type: "varchar" })
  name: string;
  @Column({ type: "varchar" })
  price: string;
  @Column({ nullable: true, type: "varchar" })
  usage: string;
  @Column({ nullable: true, type: "varchar" })
  KeyFeatures: string;
  @Column({ nullable: true, type: "varchar" })
  Details: string;
  @Column({ nullable: true, type: "varchar" })
  ShppingRestrictions: string;
  @Column({ type: "varchar" })
  Catagory: string;
  @Column((type) => subCatagory)
  subcatagory: subCatagory[];
  @Column((type) => Gallery)
  gallery: Gallery[];
  @Column((type) => Reviews)
  reviews: Reviews[];
}

export class subCatagory {
  @Column()
  catagory: string;
  constructor(catagory: string) {
    this.catagory = catagory;
  }
}
export class Gallery {
  @Column({ type: "varchar" })
  url: string;
  @Column()
  isImage: boolean;
  constructor(url: string, isImage: boolean) {
    this.url = url;
    this.isImage = isImage;
  }
}
export class Reviews {
  @ObjectIdColumn()
  _id: ObjectID;
  @Column()
  comment: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public created_at: Date;
  @Column()
  userid: string;
}
