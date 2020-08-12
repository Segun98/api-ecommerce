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
    customer_address: String,
    #nested resolver
    usersProducts:[productsRes]
  }

  type loginRes  {
    accesstoken:String,
    role:String
  }

#used globally
  type customRes  {
    message: String
  }

`;