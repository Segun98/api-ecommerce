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

  # Response objects 

  type usersRes{
    id:ID,
    first_name: String,
    last_name: String,
    email: String
    role: String,
    phone: String,
    pending: String,
    created_at: String
  }

  type loginRes  {
    accesstoken:String,
    role:String
  }

  type signupRes  {
    message: String
  }
# Queries 
  type Query {
   users: [usersRes],
   user:usersRes
 }

#  mutations 
  type Mutation {
    signUp(first_name: String!, last_name: String!, email: String!, password: String!, confirm_password: String!, phone:String, role: String!, pending: String!):signupRes
    
    logIn(email: String!, password: String!):loginRes
  }
`;