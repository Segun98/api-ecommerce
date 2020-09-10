const {
    user,
    users,
    getUser,
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
    getUser,
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