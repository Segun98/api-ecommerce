const {
    user,
    getUser,
    editUserPage,
    customerProfile,
    getStores
} = require("./users")
const {
    product,
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
    getVendorOrders
} = require("./orders")

//all admin functionality here
const {
    getAllOrders,
    users,
    products
} = require("./admin")

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