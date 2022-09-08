import "reflect-metadata";
import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import db from "./database";
import {
  GalleryGQLIn,
  PostGQL,
  ReviewsGQL,
  subCatagoryGQLType,
} from "./gql/Post.gql";
import { UserGQL } from "./gql/User.gql";
import * as gql from "graphql";
import { Gallery, Post, Reviews, subCatagory } from "./database/Post.entity";
import { User } from "./database/User.entity";
import { compare } from "bcrypt";

const app = express();

db.initialize().then((db) => {
  app.use(
    "/",
    graphqlHTTP({
      graphiql: true,
      schema: new gql.GraphQLSchema({
        query: new gql.GraphQLObjectType({
          name: "Root",
          description: "All root query",
          fields: () => ({
            Prodects: {
              type: new gql.GraphQLList(PostGQL),
              args: {
                start: {
                  type: gql.GraphQLInt,
                  defaultValue: 0,
                },
                limit: {
                  type: gql.GraphQLInt,
                  defaultValue: 20,
                },
              },
              resolve: async (_, a) => {
                return (await db.getMongoRepository(Post).find()).slice(
                  a.start,
                  a.limit
                );
              },
            },
            Prodect: {
              type: PostGQL,
              args: {
                id: { type: gql.GraphQLID },
              },
              resolve: (_, a) => db.getMongoRepository(Post).findOneById(a.id),
            },
            user: {
              type: UserGQL,
              args: {
                id: { type: gql.GraphQLID },
              },
              resolve: (_, a) =>
                db.getMongoRepository(User).findOne({ where: { _id: a.id } }),
            },
          }),
        }),
        mutation: new gql.GraphQLObjectType({
          name: "mutation",
          description: "All mutation qurey",
          fields: () => ({
            AddProudet: {
              type: PostGQL,
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
                keyFreatuers: {
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
                subcatagory: {
                  type: new gql.GraphQLList(subCatagoryGQLType),
                },
                gallery: {
                  type: new gql.GraphQLList(GalleryGQLIn),
                },
              },
              resolve: (_, a) => {
                // console.log(a);

                const protect = new Post();
                protect.name = a.name;
                protect.Catagory = a.Catagory;
                protect.Details = a.Details;
                protect.KeyFeatures = a.keyFreatuers;
                protect.ShppingRestrictions = a.ShppingRestrictions;
                protect.longDescription = a.longDescription;
                protect.price = a.price;
                let s = [];
                for (let i of a.subcatagory) {
                  let k = new subCatagory(i.catagory);
                  //   k.catagory = i.catagory;
                  s.push(k);
                }
                // console.log(protect);
                protect.subcatagory = s;
                protect.usage = a.usage;

                let g = [];
                for (let i of a.gallery) {
                  g.push(new Gallery(i.url, i.isImage));
                }
                protect.gallery = g;
                protect.reviews = [];

                return db.getMongoRepository(Post).save(protect);
              },
            },
            AddUser: {
              type: UserGQL,
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
              type: UserGQL,
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
              type: ReviewsGQL,
              ages: {
                product_id: {
                  type: gql.GraphQLID,
                },
                userId: {
                  type: gql.GraphQLID,
                },
                comment: {
                  type: gql.GraphQLString,
                },
              },
              resolve: async (_, ages) => {
                const r = new Reviews();
                r.comment = ages.comment;
                r.userid = ages.userId;

                await db.getMongoRepository(Post).update(ages.product_id, {
                  reviews: [
                    ...(await (
                      await db
                        .getMongoRepository(Post)
                        .findOneById(ages.product_id)
                    ).reviews),
                    r,
                  ],
                });
                return r;
              },
            },
            UpdateReview: {
              type: ReviewsGQL,
              ages: {
                Id: {
                  type: gql.GraphQLID,
                },
                comment: {
                  type: gql.GraphQLString,
                },
              },
              resolve: async (_, a) => {
                const p = await db.getMongoRepository(Post).find({
                  where: {
                    "reviews._id": { $eq: a.Id },
                  },
                });
                const s = p[0].reviews.filter((f) => f._id == a.Id);
                s[0].comment = a.comment;
                p[0].reviews.map((s, i) => {
                  s._id == a.Id ? (p[0].reviews[i] = s[0]) : null;
                });
                return await db
                  .getMongoRepository(Post)
                  .update(p[0]._id, { reviews: p[0].reviews });
              },
            },
            deletReview: {
              type: ReviewsGQL,
              ages: {
                Id: {
                  type: gql.GraphQLID,
                },
              },
              resolve: async (_, a) => {
                const p = await db.getMongoRepository(Post).find({
                  where: {
                    "reviews._id": { $eq: a.Id },
                  },
                });
                p[0].reviews.map((s, i) => {
                  s._id == a.Id ? p[0].reviews.slice(i, 1) : null;
                });
                return await db
                  .getMongoRepository(Post)
                  .update(p[0]._id, { reviews: p[0].reviews });
              },
            },
          }),
        }),
      }),
    })
  );
  app.listen(8000, () => console.log("server start in http://localhost:8000"));
});
