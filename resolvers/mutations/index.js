//@ts-check
const {
    signUp,
    logIn
} = require("./signup-login")
const {
    updateProfile
} = require("./updateProfile")
const productsMutations = require('./products')
const cartMutations = require('./cart')
const ordersMutations = require('./orders')
const adminOrdersMutations = require("./admin/orders")
const adminUsersMutations = require("./admin/users")
const adminProductsMutations = require("./admin/products")

module.exports = {
    signUp,
    logIn,
    updateProfile,
    ...productsMutations,
    ...cartMutations,
    ...ordersMutations,
    ...adminOrdersMutations,
    ...adminUsersMutations,
    ...adminProductsMutations
}