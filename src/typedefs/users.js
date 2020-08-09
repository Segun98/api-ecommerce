const {
  gql
} = require('apollo-server-express');

module.exports = gql `
type users{
    id:ID,
    first_name: String,
    last_name: String,
    email: String
    password: String,
    confirm_password: String,
    role: String,
    phone: String,
    pending: String,
    created_at: String
  }

  type loginRes  {
    accesstoken:String,
    message:String,
    role:String
  }

  type Query {
   users: [users],
   user(first_name: String!):users
 }
  type Mutation {
    signUp(first_name: String!, last_name: String!, email: String!, password: String!, confirm_password: String!, phone:String, role: String!, pending: String!):users
    
    logIn(email: String!, password: String! role: String!):loginRes
  }
`;