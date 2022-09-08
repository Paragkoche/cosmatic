import {
  Entity,
  Column,
  ObjectID,
  ObjectIdColumn,
  BeforeInsert,
} from "typeorm";
import { genSalt, hash } from "bcrypt";

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
  address: string;
  @Column()
  phone_number: string;
  @Column()
  isAdmin: boolean;
  @BeforeInsert()
  passwordHash = async () => {
    this.password = await hash(this.password, await genSalt(14));
  };
}
