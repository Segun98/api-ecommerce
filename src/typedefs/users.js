const {
  gql
} = require('apollo-server-express');

module.exports = gql `
type users{
    name: String,
    email: String
    password: String,
    role: String,
    pending: Boolean
  }

  type Query {
   users: [users],
   user(name: String!):users
 }
  type Mutation {
    createUser(name: String!, email: String!, password: String!, role: String!, pending: Boolean!):users
  }
`;