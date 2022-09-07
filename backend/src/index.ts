import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import * as gql from "graphql";
import { Gallery } from "./database/entity/Gallery.entity";
import { Post } from "./database/entity/Post.entity";
import { User } from "./database/entity/User.entity";
import db from "./database/index.databses";
import { GalleryGQLType, GalleryGQLTypeInput } from "./gql/Gallery.gql";
import { ProductGQLType } from "./gql/Post.gql";
import { UserGQLType } from "./gql/User.gql";
import { compare } from "bcrypt";
import { ReviewsGQLType } from "./gql/Reviews.gql";
import { Reviews } from "./database/entity/Reviews.entity";
import "reflect-metadata";
import * as Cors from "cors"
const app = express();
app.use(Cors())
app.use(
  "/",
  graphqlHTTP({
    graphiql: true,
    schema: new gql.GraphQLSchema({
      query: new gql.GraphQLObjectType({
        name: "Root_Query",
        description: "All Query",
        fields: () => ({
          Products: {
            type: gql.GraphQLList(ProductGQLType),
            resolve: () => db.getMongoRepository(Post).find(),
          },
          Product: {
            type: ProductGQLType,
            args: {
              id: {
                type: gql.GraphQLID,
              },
            },
            resolve: (_, args) =>
              db.getMongoRepository(Post).findOneById(args.id),
          },
          user: {
            type: UserGQLType,
            args: {
              id: {
                type: gql.GraphQLID,
              },
            },
            resolve: (_, args) =>
              db.getMongoRepository(User).findOneById(args.id),
          },
        }),
      }),
      mutation: new gql.GraphQLObjectType({
        name: "Root_Mutation",
        description: "All Mutation",
        fields: () => ({
          AddProduct: {
            type: ProductGQLType,
            args: {
              longDescription: {
                type: gql.GraphQLString,
              },
              name: {
                type: gql.GraphQLString,
              },
              price: {
                type: gql.GraphQLString,
              },
              usage: {
                type: gql.GraphQLString,
              },
              KeyFeatures: {
                type: gql.GraphQLString,
              },
              Details: {
                type: gql.GraphQLString,
              },
              ShppingRestrictions: {
                type: gql.GraphQLString,
              },
              Catagory: {
                type: gql.GraphQLString,
              },
              subCatagory: {
                type: gql.GraphQLString,
              },
              gallery: {
                type: gql.GraphQLList(GalleryGQLTypeInput),
              },
            },
            resolve: async (_, args) => {
              const gallery = [];
              for (let gallerys of args.gallery) {
                gallery.push(
                  await db
                    .getMongoRepository(Gallery)
                    .save(db.getMongoRepository(Gallery).create(gallerys))
                );
              }
              return db.getMongoRepository(Post).save(
                db.getMongoRepository(Post).create({
                  ...args,
                  gallery: gallery,
                })
              );
            },
          },
          AddUser: {
            type: UserGQLType,
            args: {
              first_name: {
                type: gql.GraphQLString,
              },
              Last_name: {
                type: gql.GraphQLString,
              },
              email: {
                type: gql.GraphQLString,
              },
              password: {
                type: gql.GraphQLString,
              },
              addrest: {
                type: gql.GraphQLString,
              },
              phone_number: {
                type: gql.GraphQLString,
              },
              isAdmain: {
                type: gql.GraphQLBoolean,
              },
            },
            resolve: (_, args) => {
              return db
                .getMongoRepository(User)
                .save(db.getMongoRepository(User).create({ ...args }));
            },
          },
          LoginUser: {
            type: UserGQLType,
            args: {
              email: {
                type: gql.GraphQLString,
              },
              password: {
                type: gql.GraphQLString,
              },
            },
            resolve: async (_, args) => {
              const user = await db.getMongoRepository(User).findOne({
                where: {
                  email: args.email,
                },
              });
              if (user != undefined) {
                if (await compare(args.password, user.password)) {
                  return user;
                } else {
                  return new Error("Incorrect password");
                }
              } else {
                return new Error("User not fonud");
              }
            },
          },
          AddReview: {
            type: ReviewsGQLType,
            args: {
              User_id: {
                type: gql.GraphQLID,
              },
              id: {
                type: gql.GraphQLID,
              },
              comment: {
                type: gql.GraphQLString,
              },
            },
            resolve: async (_, args) => {
              const user = await db
                .getMongoRepository(User)
                .findOne({ where: { _id: args.User_id } });
              return db.getMongoRepository(Reviews).save(
                db.getMongoRepository(Reviews).create({
                  product: await db
                    .getMongoRepository(Post)
                    .findOneById(args.id),
                  comment: args.comment,
                  user: user,
                })
              );
            },
          },
          UpdateReview: {
            type: ReviewsGQLType,
            args: {
              id: {
                type: gql.GraphQLID,
              },
              comment: {
                type: gql.GraphQLString,
              },
            },
            resolve: async (_, args) => {
              return db.getMongoRepository(Reviews).findOneAndUpdate(args.id, {
                comment: args.comment,
              });
            },
          },
          deletReview: {
            type: ReviewsGQLType,
            args: {
              id: {
                type: gql.GraphQLID,
              },
            },
            resolve: async (_, args) => {
              return db.getMongoRepository(Reviews).findOneAndDelete(args.id);
            },
          },
        }),
      }),
    }),
  })
);

app.listen(8080, () => {
  db.initialize().then(() => {
    console.log("server start http://localhost:8080");
  });
});
