/*
 first arg expects parent, second expects inputs, third - context
*/
module.exports = {

    async product(_, {
        name_slug
    }, {
        pool
    }) {
        try {
            const product = await pool.query(`select * from products where name_slug = $1`, [name_slug])
            return product.rows[0]
        } catch (err) {
            throw new Error(err.message)
        }
    },

    async featuredProducts(_, {
        limit
    }, {
        pool
    }) {
        try {
            // const start = Date.now()
            // console.time('Query time');
            const users = await pool.query(`SELECT p.id, p.name, p.name_slug, p.price, p.images from products p INNER JOIN users u on p.creator_id= u.id where p.featured = $1 and u.online = $1 and p.available_qty > 0 and p.in_stock = $1 ORDER BY p.created_at desc limit ${limit}`, ['true'])
            // console.timeEnd('Query time');
            // console.log(Date.now() - start);
            return users.rows

        } catch (err) {
            throw new Error(err.message)
        }
    },


    async byCategory(_, {
        category,
        limit,
        offset
    }, {
        pool
    }) {
        try {
            const products = await pool.query(`select p.id, p.name, p.name_slug, p.price, p.images from products p inner join users u on p.creator_id = u.id where p.category = $1 and u.online = $2 and p.available_qty > 0 and p.in_stock = $2 order by u.completed_qty desc limit ${limit} offset ${offset}`, [category, "true"])
            return products.rows
        } catch (err) {
            throw new Error(err.message)
        }
    },

    async partyCategory(_, {
        party_category,
        limit,
        offset
    }, {
        pool
    }) {
        try {
            const products = await pool.query(`select p.id, p.name, p.name_slug, p.price, p.images, p.party_category from products p inner join users u on p.creator_id = u.id where p.party_category = $1 and u.online = $2 and p.available_qty > 0 and p.in_stock = $2 order by u.completed_qty desc limit ${limit} offset ${offset}`, [party_category, "true"])
            return products.rows
        } catch (err) {
            throw new Error(err.message)
        }
    },

    async editProductPage(_, {
        id
    }, {
        pool
    }) {
        try {
            const product = await pool.query(`select * from products where id = $1`, [id])
            return product.rows[0]
        } catch (err) {
            throw new Error(err.message)
        }
    },

    async search(_, {
        query,
        limit,
        offset,
        sort
    }, {
        pool
    }) {

        /* is this how it's done in large apps? lol.
         dynamically add sort to the sql query */

        let sortQuery = ""
        if (sort === "low") {
            sortQuery = `p.price asc,`
        } else if (sort === "high") {
            sortQuery = `p.price desc,`
        }

        try {
            const products = await pool.query(`SELECT p.id, p.name, p.name_slug, p.price, p.images FROM products p INNER JOIN users u on p.creator_id = u.id WHERE p.name ILIKE '%${query}%' and u.online = $1 and p.available_qty > 0 and p.in_stock = $1 ORDER BY ${sortQuery} u.completed_qty DESC LIMIT ${limit} OFFSET ${offset}`, ["true"])
            return products.rows
        } catch (err) {
            throw new Error(err.message)
        }
    }

}