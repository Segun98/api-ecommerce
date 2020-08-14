const {
  gql
} = require('apollo-server-express');

module.exports = gql `
    type cart{
    id: ID,
    name: String,
    price: Int,
    quantity: Int,
    delivery_fee: Int,
    subtotal: Int,
    description: String,
    product_id: ID,
    prod_creator_id: ID,
    customer_id: ID,
    created_at: String,

    #nested query
    cartCreator:usersRes

    productCreator:usersRes
  }

`;