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
    updateCart
}