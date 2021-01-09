const {
  gql
} = require('apollo-server-express');

module.exports = gql `

  #  ALL mutations 
    type Mutation {


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
        updateQuantity(id:ID! qty_ordered: Int):customRes

        #CART Section 
        addToCart(
          customer_id:ID!,
          product_id: ID!,
          prod_creator_id: ID!, quantity:Int):customRes

          deleteFromCart(id:ID):customRes
          deleteAllFromCart(customer_id:ID!):customRes
          updateCart(id:ID, quantity:Int):customRes

          # ORDERS

          createOrder(
          order_id:ID!
          name: String!,
          price: Int!,
          quantity: Int,
          subtotal: Int!,
          request: String,
          customer_email: String,
          vendor_email: String,
          customer_phone: String,
          vendor_phone: String,
          customer_address: String,
          business_address: String,
          product_id: ID!,
          prod_creator_id: ID!
          ):customRes

          updateOrder(order_id:ID!, transaction_id:ID!, delivery_fee:Int, total_price:Int!):customRes

          cancelOrder(order_id:ID!,canceled_reason:String):customRes

          #Admin
          setUserStatus(pending:String!,id:ID!):customRes
          setInTransit(order_id:ID!):customRes
          completeOrder(order_id:ID!):customRes,
          cancelOrderAdmin(order_id:ID!,canceled_reason:String):customRes
          updateCompleted(id:ID!):customRes
          #set a product as featured
          setFeatured(id:ID! featured:String!):customRes
          deleteProductAdmin(id:ID!):customRes
          #toggle in stock/out of stock
          setOutOfStock(id:ID! in_stock:String!):customRes
    }
  
  `;