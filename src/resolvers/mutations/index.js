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

module.exports = {
    signUp,
    logIn,
    updateProfile,
    addProduct,
    updateProduct,
    deleteProduct,
    setUserStatus
}