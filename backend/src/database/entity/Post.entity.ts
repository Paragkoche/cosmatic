import {
  Column,
  Entity,
  ManyToOne,
  ObjectID,
  ObjectIdColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Gallery } from "./Gallery.entity";
import { Reviews } from "./Reviews.entity";

@Entity()
export class Post {
  @ObjectIdColumn()
  _id: ObjectID;
  @Column()
  longDescription: string;
  @Column()
  name: string;
  @Column()
  price: string;
  @Column({ nullable: true })
  usage: string;
  @Column({ nullable: true })
  KeyFeatures: string;
  @Column({ nullable: true })
  Details: string;
  @Column({ nullable: true })
  ShppingRestrictions: string;
  @Column()
  Catagory: string;
  @Column()
  subCatagory: string;
  @Column()
  gallery: Gallery[];

  @Column()
  reviews: Reviews[];
}
