const mutations = require("./mutations")
const queries = require("./queries")

module.exports = {
    Mutation: {
        ...mutations
    },
    Query: {
        ...queries
    },
    //nested queries
    //userRes is the name of a type in /typedefs/users.js
    //returns products by a user
    usersRes: {
        async usersProducts(parent, {}, {
            pool
        }) {
            try {
                const result = await pool.query(`select * from products where creator_id = $1`, [parent.id])

                return result.rows

            } catch (err) {
                throw new Error(err.message)
            }

        }
    },

    //productsRes is the name of a type in /typedefs/products.js
    //gets you product creator
    productsRes: {
        async creator(parent, {}, {
            pool
        }) {
            try {
                const result = await pool.query(`select * from users where id = $1`, [parent.creator_id])
                return result.rows[0]

            } catch (err) {
                throw new Error(err.message)
            }

        },

        //get related products
        async related(parent, {}, {
            pool
        }) {
            try {
                const result = await pool.query(`select * from products where category = $1`, [parent.category])
                return result.rows

            } catch (err) {
                throw new Error(err.message)
            }

        }

    }
}