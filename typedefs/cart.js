const {
  gql
} = require('apollo-server-express');

module.exports = gql `
    type cart{
    id: ID
    quantity: Int
    product_id: ID
    prod_creator_id: ID
    customer_id: ID
    created_at: String

    #nested query
    product:productsRes
    productCreator:usersRes
  }

`;