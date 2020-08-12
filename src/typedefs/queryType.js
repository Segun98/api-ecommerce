const {
  gql
} = require('apollo-server-express');

module.exports = gql `
  
  # Queries 
    type Query {
    #gets a single user, admin only
     users: [usersRes],
  
     user(business_name_slug:String!):usersRes,

    #Query for products, type defs is in './product.js'
     products: [productsRes],

    #get a product
    product(name_slug:String!):productsRes ,


   }
  
  `;