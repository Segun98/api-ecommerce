const {
    user,
    users,
    getUser,
    editUserPage,
    customerProfile,
    getStores
} = require("./users")
const {
    product,
    products,
    search,
    byCategory,
    partyCategory,
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
    search,
    byCategory,
    partyCategory,
    editProductPage,
    editUserPage,
    customerProfile,
    getStores,
    getCartItems,
    getCart,
    getCustomerOrders,
    getVendorOrders,
    getAllOrders
};