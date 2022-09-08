import * as gql from "graphql";

export const UserGQL = new gql.GraphQLObjectType({
  name: "User",
  description: "All User Fileds",
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

    address: {
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
