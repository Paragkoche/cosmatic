import {
  BeforeInsert,
  Column,
  Entity,
  ObjectID,
  OneToMany,
  ObjectIdColumn,
} from "typeorm";
import { hash, genSalt } from "bcrypt";
import { Reviews } from "./Reviews.entity";
@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectID;
  @Column()
  first_name: string;
  @Column()
  Last_name: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column()
  addrest: string;
  @Column()
  phone_number: string;
  @Column()
  isAdmin: boolean;

  @BeforeInsert()
  passwordHash = async () => {
    this.password = await hash(this.password, await genSalt(14));
  };
}
