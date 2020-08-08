const {
  gql
} = require('apollo-server-express');

module.exports = gql `
type users{
    id:ID
    name: String,
    email: String
    password: String,
    role: String,
    phone: String,
    pending: String,
    created_at: String
  }

  type Query {
   users: [users],
   user(name: String!):users
 }
  type Mutation {
    createUser(name: String!, email: String!, password: String!, phone:String, role: String!, pending: String!):users
  }
`;