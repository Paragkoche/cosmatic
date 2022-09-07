import * as gql from "graphql";

export const UserGQLType = new gql.GraphQLObjectType({
  name: "User",
  description: "User All Field",
  fields: () => ({
    _id: {
      type: gql.GraphQLID,
    },
    first_name: {
      type: gql.GraphQLString,
    },
    Last_name: {
      type: gql.GraphQLString,
    },
    email: {
      type: gql.GraphQLString,
    },
    addrest: {
      type: gql.GraphQLString,
    },
    phone_number: {
      type: gql.GraphQLString,
    },
    isAdmin: {
      type: gql.GraphQLBoolean,
    },
  }),
});
