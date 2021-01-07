// @ts - check
const usersQueries = require("./users")
const productsQueries = require("./products")
const cartQueries = require("./cart")
const ordersQueries = require("./orders")

//all admin functionality here
const getOrdersAdmin = require("./admin/orders")
const {
    products
} = require("./admin/products")
const {
    users
} = require("./admin/users")

module.exports = {
    ...usersQueries,
    ...productsQueries,
    ...cartQueries,
    ...ordersQueries,
    ...getOrdersAdmin,
    products,
    users
};