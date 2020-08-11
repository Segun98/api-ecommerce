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
    business_name: String,
    business_name_slug:String,
    business_address: String,
    business_area: String,
    business_image: String,
    business_bio:String,
    customer_address: String
  }

  # Response objects 

  type usersRes{
    id:ID,
    first_name: String,
    last_name: String,
    email: String,
    role: String,
    phone: String,
    pending: String,
    created_at: String,
    business_name: String,
    business_name_slug:String,
    business_address: String,
    business_area: String,
    business_image: String,
    business_bio:String,
    customer_address: String
  }

  type loginRes  {
    accesstoken:String,
    role:String
  }

  type customRes  {
    message: String
  }

# Queries 
  type Query {
  #gets a single user, admin only
   users: [usersRes],

   user:usersRes,

   
 }


#  mutations 
  type Mutation {
    signUp(first_name: String!, last_name: String!, email: String!, password: String!, confirm_password: String!, phone:String, role: String!, pending: String!, business_name: String, business_name_slug: String, business_address: String, business_area: String, business_image: String, business_bio: String, customer_address: String):customRes
    
    logIn(email: String!, password: String!):loginRes

    #where customers and vendors update their profile
   updateProfile(first_name: String, last_name: String, phone:String, business_name: String, business_address: String, business_area: String, business_image: String, business_bio: String, customer_address: String): customRes
  }

`;