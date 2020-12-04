const {
    signUp,
    logIn
} = require("./signup-login")
const {
    updateProfile,
    setUserStatus
} = require("./updateProfile")
const {
    addProduct,
    updateProduct,
    deleteProduct,
    updateQuantity
} = require('./products')
const {
    addToCart,
    deleteFromCart,
    updateCart
} = require('./cart')
const {
    createOrder,
    cancelOrder,
    acceptOrder,
    updateOrder
} = require('./orders')
const {
    completeOrder,
    cancelOrderAdmin
} = require("./admin/orders")

module.exports = {
    signUp,
    logIn,
    updateProfile,
    addProduct,
    updateProduct,
    deleteProduct,
    updateQuantity,
    setUserStatus,
    addToCart,
    deleteFromCart,
    updateCart,
    createOrder,
    cancelOrder,
    acceptOrder,
    updateOrder,
    completeOrder,
    cancelOrderAdmin
}