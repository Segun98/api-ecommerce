const Joi = require("joi")

const registerValidation = (data) => {
    const schema = Joi.object({
        first_name: Joi.string().required().min(3).max(30).error(new Error('first name cannot be less than 3 characters')),
        last_name: Joi.string().required().min(3).max(30).error(new Error('last name cannot be less than 3 characters')),
        email: Joi.string().required().email().error(new Error('please enter a valid email')),
        password: Joi.string().required().min(9).error(new Error('password must be atleast 9 characters')),
        confirm_password: Joi.ref('password')
    })
    const validate = schema.validate(data)
    return validate

}


module.exports = {
    registerValidation
}