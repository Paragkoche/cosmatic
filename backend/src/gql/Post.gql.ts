import * as gql from "graphql";
import db from "../database/index.databses";
import { Gallery } from "../database/entity/Gallery.entity";
import { Reviews } from "../database/entity/Reviews.entity";
import { GalleryGQLType } from "./Gallery.gql";
import { ReviewsGQLType } from "./Reviews.gql";
export const ProductGQLType = new gql.GraphQLObjectType({
  name: "Product",
  description: "Product All Field",
  fields: () => ({
    _id: {
      type: gql.GraphQLID,
    },
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
    subCatagory: {
      type: gql.GraphQLString,
    },
    gallery: {
      type: new gql.GraphQLList(GalleryGQLType),
      // resolve: async (post) => {
      //   console.log(post);

      //   return db.getMongoRepository(Gallery).find({
      //     where: {
      //       Post: {
      //         _id: post._id,
      //       },
      //     },
      //   });
      // },
    },
    reviews: {
      type: new gql.GraphQLList(ReviewsGQLType),
      // resolve: async (post) => {
      //   return db.getMongoRepository(Reviews).find({
      //     where: {
      //       product: {
      //         _id: post.id,
      //       },
      //     },
      //   });
      // },
    },
  }),
});
