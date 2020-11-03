const {
    gql
} = require('apollo-server-express');

module.exports = gql `

    type products{
        id: ID,
        name: String,
        name_slug:String,
        description: String,
        price:Int,
        category: String,
        party_category:String,
        images: [String],
        in_stock: String,
        creator_id: String,
        available_qty: Int,
        featured:String
    }
          
    # Response objects from fetching a product
    type productsRes{
        id: ID,
        name: String,
        name_slug:String,
        description: String,
        price:Int,
        category: String,
        party_category:String,
        images: [String],
        in_stock: String,
        creator_id: String,
        created_at: String,
        available_qty: Int,
        featured:String,
        #nested query . userRes can be found in ./users
        creator: usersRes
        related: [productsRes]
    }
        
`;