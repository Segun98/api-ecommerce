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
        image: String,
        in_stock: String,
        creator_id: String
    }
          
    # Response objects from fetching a product
    type productsRes{
        id: ID,
        name: String,
        name_slug:String,
        description: String,
        price:Int,
        category: String,
        image: String,
        in_stock: String,
        creator_id: String,
        created_at: String
    }
        
`;