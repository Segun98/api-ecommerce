const mutations = require("./mutations")
const queries = require("./queries")
const {
    creator,
    related
} = require("./nested-queries/productsRes")
const {
    usersProducts
} = require("./nested-queries/usersRes")

module.exports = {
    Mutation: {
        ...mutations
    },
    Query: {
        ...queries
    },

    //nested queries

    //userRes is the name of a type in /typedefs/users.js
    usersRes: {
        //returns products by a user
        usersProducts
    },

    //productsRes is the name of a type in /typedefs/products.js
    productsRes: {
        //gets you product creator
        creator,
        //get related products
        related

    },

    cart: {
        async cartCreator(parent, {}, {
            pool
        }) {
            const result = await pool.query(`select * from users where id =$1`, [parent.customer_id])
            return result.rows[0]
        },
        async productCreator(parent, {}, {
            pool
        }) {
            const result = await pool.query(`select * from users where id =$1`, [parent.prod_creator_id])
            return result.rows[0]
        }
    }

}