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
    editProductPage,
    featuredProducts
} = require("./products")
const {
    getCartItems,
    getCart
} = require("./cart")
const {
    getCustomerOrders,
    getVendorOrders,
    getOrder
} = require("./orders")

//all admin functionality here
const {
    getAllOrders
} = require("./admin/orders")
const {
    products
} = require("./admin/products")
const {
    users
} = require("./admin/users")

module.exports = {
    users,
    user,
    getUser,
    product,
    products,
    featuredProducts,
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
    getAllOrders,
    getOrder
};