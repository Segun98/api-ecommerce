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
            loaderOne
        }) {
            return loaderOne.load("users", "id", parent.customer_id)
        },
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
    }

}