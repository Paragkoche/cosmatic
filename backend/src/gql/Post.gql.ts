import * as gql from "graphql";

export const PostGQL = new gql.GraphQLObjectType({
  name: "Post",
  description: "All Post Fileds",
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
    subcatagory: {
      type: new gql.GraphQLList(subCatagoryGQL),
    },
    gallery: {
      type: new gql.GraphQLList(GalleryGQL),
    },
    reviews: {
      type: new gql.GraphQLList(ReviewsGQL),
    },
  }),
});
export const subCatagoryGQL = new gql.GraphQLObjectType({
  name: "subCatagory",
  description: "sub-catagory fileds",
  fields: () => ({
    catagory: {
      type: gql.GraphQLString,
    },
  }),
});
export const subCatagoryGQLType = new gql.GraphQLInputObjectType({
  name: "subCatagory_Input",
  description: "sub-catagory fileds",
  fields: () => ({
    catagory: {
      type: gql.GraphQLString,
    },
  }),
});
export const GalleryGQL = new gql.GraphQLObjectType({
  name: "Gallery",
  description: "Gallery fileds",
  fields: () => ({
    url: {
      type: gql.GraphQLString,
    },
    isImage: {
      type: gql.GraphQLBoolean,
    },
  }),
});
export const GalleryGQLIn = new gql.GraphQLInputObjectType({
  name: "Gallery_Input",
  description: "Gallery fileds",
  fields: () => ({
    url: {
      type: gql.GraphQLString,
    },
    isImage: {
      type: gql.GraphQLBoolean,
    },
  }),
});
export const ReviewsGQL = new gql.GraphQLObjectType({
  name: "Reviews",
  description: "Reviews fileds",
  fields: () => ({
    comment: {
      type: gql.GraphQLString,
    },
    created_at: {
      type: gql.GraphQLString,
    },
  }),
});
