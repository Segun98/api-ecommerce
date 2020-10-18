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
    deleteProduct
} = require('./products')
const {
    addToCart,
    deleteFromCart,
    updateCart
} = require('./cart')
const {
    createOrder,
    cancelOrder,
    acceptOrder
} = require('./orders')
const {
    completeOrder,
    cancelOrderAdmin
} = require("./admin")

module.exports = {
    signUp,
    logIn,
    updateProfile,
    addProduct,
    updateProduct,
    deleteProduct,
    setUserStatus,
    addToCart,
    deleteFromCart,
    updateCart,
    createOrder,
    cancelOrder,
    acceptOrder,
    completeOrder,
    cancelOrderAdmin
}