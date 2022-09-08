import { DataSource } from "typeorm";
import { Post } from "./Post.entity";
import { User } from "./User.entity";

export default new DataSource({
  host: "127.0.0.1",
  type: "mongodb",
  port: 27017,
  database: "cosmatic",
  useUnifiedTopology: true,
  entities: [User, Post],
  logger: "debug",
  loggerLevel: "debug",
  synchronize: true,
});
