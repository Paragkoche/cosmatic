import * as gql from "graphql";

export const GalleryGQLType = new gql.GraphQLObjectType({
  name: "Gallery",
  description: "Gallery All Field",
  fields: () => ({
    _id: {
      type: gql.GraphQLID,
    },
    url: {
      type: gql.GraphQLString,
    },
    isImage: {
      type: gql.GraphQLBoolean,
    },
  }),
});
export const GalleryGQLTypeInput = new gql.GraphQLInputObjectType({
  name: "Gallery_Input",
  description: "Gallery All Field",
  fields: () => ({
    url: {
      type: gql.GraphQLString,
    },
    isImage: {
      type: gql.GraphQLBoolean,
    },
  }),
});
