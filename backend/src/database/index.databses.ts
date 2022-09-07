import { DataSource } from "typeorm";

export default new DataSource({
  type: "mongodb",
  logging: "all",
  loggerLevel: "debug",
  synchronize: true,
  useNewUrlParser: true,
  url: "mongodb+srv://paragkoche123:koche3588@cosmatic.bytmwga.mongodb.net/?retryWrites=true&w=majority",
  entities: ["src/database/entity/*.entity.ts"],
  useUnifiedTopology: true,
  database: "cosmatic",
});
