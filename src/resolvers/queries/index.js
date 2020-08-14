const {
    user,
    users,
    editUserPage,
    customerProfile
} = require("./users")
const {
    product,
    products,
    editProductPage
} = require("./products")
const {
    getCartItems,
    getCart
} = require("./cart")
const {
    getCustomerOrders,
    getVendorOrders,
    getAllOrders
} = require("./orders")

module.exports = {
    users,
    user,
    product,
    products,
    editProductPage,
    editUserPage,
    customerProfile,
    getCartItems,
    getCart,
    getCustomerOrders,
    getVendorOrders,
    getAllOrders
};