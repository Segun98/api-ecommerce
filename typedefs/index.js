const users = require("./users")
const products = require("./products")
const cart = require("./cart")
const orders = require("./orders")
const queryType = require("./queryType")
const mutationType = require("./mutationType")

module.exports = [users, products, cart, orders, queryType, mutationType]