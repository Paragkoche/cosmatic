import * as gql from "graphql";
import { UserGQLType } from "./User.gql";
import db from "../database/index.databses";
import { User } from "../database/entity/User.entity";
export const ReviewsGQLType = new gql.GraphQLObjectType({
  name: "Reviews",
  description: "Reviews All Field",
  fields: () => ({
    _id: {
      type: gql.GraphQLID,
    },
    comment: {
      type: gql.GraphQLString,
    },
    // user: {
    //   type: UserGQLType,
    //   resolve: (review) => {
    //     return db.getMongoRepository(User).find({
    //       where: {
    //         reviews: {
    //           _id: review.id,
    //         },
    //       },
    //     });
    //   },
    // },
  }),
});
