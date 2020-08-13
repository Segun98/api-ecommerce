const {
    gql
} = require('apollo-server-express');

module.exports = gql `
    type cart {
    id: Int,
    price: Int,
    quantity: Int int,
    delivery_fee: Int,
    subtotal: Int,
    description: String,
    product_id: ID,
    prod_creator_id: ID,
    customer_id: ID,
    created_at: String
  }

`;