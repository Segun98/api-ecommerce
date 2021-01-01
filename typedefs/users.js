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
    online:String,
    business_name: String,
    business_name_slug:String,
    business_address: String,
    business_image: String,
    business_bio:String,
    customer_address: String,
    featured:String,
    completed_qty:Int
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
    online:String,
    created_at: String,
    business_name: String,
    business_name_slug:String,
    business_address: String,
    business_image: String,
    business_bio:String,
    customer_address: String,
    featured:String,
    completed_qty:Int
    jwt_user_id: String
    #nested resolver
    usersProducts:[productsRes]
    customerOrders:[orders]
  }

  type loginRes  {
    refreshtoken:String, #should be sent over an http only cookie for a production app
    accesstoken:String,
    role:String,
    pending:String
  }

#used globally
  type customRes  {
    message: String
  }

`;