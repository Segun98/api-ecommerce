/*
 Returns all users for admin dashboard
 first arg expects parent, second expects inputs, third - context
*/

async function users(_, {}, {
    req,
    pool
}) {
    console.log(req.body);
    try {
        const res = await pool.query(`select * from users order by created_at desc`)
        return res.rows

    } catch (err) {
        throw new Error(err.message)
    }
}

async function user(_, {
    first_name
}, {
    pool
}) {
    try {
        const res = await pool.query(`select * from users where first_name = $1`, [first_name])
        return res.rows[0]
    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = {
    users,
    user
}