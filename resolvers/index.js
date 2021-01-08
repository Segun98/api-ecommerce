const mutations = require("./mutations")
const queries = require("./queries")
const {
    creator,
    related
} = require("./nested-queries/productsRes")
const {
    usersProducts,
    customerOrders
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
        usersProducts,
        customerOrders
    },

    //productsRes is the name of a type in /typedefs/products.js
    productsRes: {
        //gets you product creator
        creator,
        //get related products
        related

    },

    cart: {
        async productCreator(parent, {}, {
            loaderOne
        }) {
            return loaderOne.load("users", "id", parent.prod_creator_id)
        },
        async product(parent, {}, {
            loaderOne
        }) {
            return loaderOne.load("products", "id", parent.product_id)
        }
    },
    orders: {
        async orderStatus(parent, {}, {
            loaderOne,
            // pool
        }) {
            // const result = await pool.query(`select * from order_status where order_id =$1`, [parent.order_id])
            // return result.rows[0]
            return loaderOne.load("order_status", "order_id", parent.order_id)
        }
    }

}