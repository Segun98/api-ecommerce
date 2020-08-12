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
    }
}