const {
  gql
} = require('apollo-server-express');

module.exports = gql `
  
  # Queries 
    type Query {
    #admin only
     users: [usersRes],
  
  #public vendor/store page/profile
     user(business_name_slug:String!):usersRes,

     #gets a customer's profile
     customerProfile:usersRes

     #gets a user but for edit
    editUserPage(id:ID!):usersRes

    #Query for products, type defs is in './product.js'
     products: [productsRes],

    #get a product
    product(name_slug:String!):productsRes,

    #gets a product but for edit
    editProductPage(id:ID!):productsRes

    #Cart, gets all cart items for customer
    getCartItems:[cart]

      #getCart - serves as order page
      getCart(id:ID!):cart
   }
  
  `;