const {
  gql
} = require('apollo-server-express');

module.exports = gql `

  #  ALL mutations 
    type Mutation {

      setUserStatus(pending:String!,id:ID!):customRes

      signUp(first_name: String!, last_name: String!, email: String!, password: String!, confirm_password: String!, phone:String, role: String!, pending: String!, business_name: String, business_name_slug: String, business_address: String, business_image: String, business_bio: String, customer_address: String):customRes
      
      logIn(email: String!, password: String!):loginRes
  
      #where customers and vendors update their profile
     updateProfile(first_name: String, last_name: String, phone:String, business_name: String, business_address: String, business_image: String, business_bio: String, customer_address: String, online:String): customRes

    #Products types def in './products.js'
     addProduct(
        name: String!,
        name_slug:String!,
        description: String,
        price:Int!,
        category: String,
        party_category:String,
        images: [String],
       available_qty:Int!
        ):customRes
              
        updateProduct(
        id:ID!
        name: String!,
        description: String,
        price:Int!,
        category: String,
        party_category:String,
        images: [String],
        available_qty:Int,
        in_stock: String,
        creator_id: String!):customRes

        deleteProduct(id:ID!, creator_id: String!):customRes

        #CART Section 
        addToCart(
          product_id: ID!,
          prod_creator_id: ID!, quantity:Int):customRes

          deleteFromCart(id:ID):customRes

          updateCart(id:ID, quantity:Int):customRes

          # ORDERS
          createOrder(
          name: String!,
          price: Int!,
          quantity: Int!,
          delivery_fee: Int,
          subtotal: Int!,
          request: String,
          customer_email: String,
          vendor_email: String,
          customer_phone: String,
          vendor_phone: String,
          customer_address: String,
          business_address: String,
          product_id: ID,
          prod_creator_id: ID):customRes

          cancelOrder(id:ID!):customRes
          acceptOrder(id:ID!):customRes

          #Admin
          completeOrder(id:ID!):customRes,
          cancelOrderAdmin(id:ID!):customRes
    }
  
  `;