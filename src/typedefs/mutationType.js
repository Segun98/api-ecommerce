const {
  gql
} = require('apollo-server-express');

module.exports = gql `

  #  ALL mutations 
    type Mutation {

      setUserStatus(pending:String!,id:ID!):customRes

      signUp(first_name: String!, last_name: String!, email: String!, password: String!, confirm_password: String!, phone:String, role: String!, pending: String!, business_name: String!, business_name_slug: String!, business_address: String, business_area: String, business_image: String, business_bio: String, customer_address: String):customRes
      
      logIn(email: String!, password: String!):loginRes
  
      #where customers and vendors update their profile
     updateProfile(first_name: String, last_name: String, phone:String, business_name: String, business_address: String, business_area: String, business_image: String, business_bio: String, customer_address: String): customRes

    #Products types def in './products.js'
     addProduct(
        name: String!,
        name_slug:String!,
        description: String,
        price:Int!,
        category: String,
        image: String,
        in_stock: String):customRes
              
        updateProduct(
        id:ID!
        name: String!,
        description: String,
        price:Int!,
        category: String,
        image: String,
        in_stock: String,
        creator_id: String!):customRes

        deleteProduct(id:ID!, creator_id: String!):customRes

        #CART Section 
        addToCart(id: Int,
    price: Int,
    quantity: Int int,
    delivery_fee: Int,
    subtotal: Int,
    description: String,
    product_id: ID,
    prod_creator_id: ID,
    customer_id: ID,
    created_at: String):customRes
    }
  
  `;

function addToCart(id: Int,
  price: Int,
  quantity: Int int,
  delivery_fee: Int,
  subtotal: Int,
  description: String,
  product_id: ID,
  prod_creator_id: ID,
  customer_id: ID,
  created_at: String) {

}