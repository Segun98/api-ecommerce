const Joi = require("joi")

const registerValidation = (data) => {
    const schema = Joi.object({
        first_name: Joi.string().required().min(3).max(30),
        last_name: Joi.string().required().min(3).max(30),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
        confirm_password: Joi.ref('password'),
    })
    const validate = schema.validate(data)
    return validate

}

module.exports = {
    registerValidation
}