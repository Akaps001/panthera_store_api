const joi = require("joi");
const productSchema = joi.object({
    name:joi.string().required(),
    price:joi.number().required(),
    description:joi.string().required().min(10)
});
const productUpdateSchema = joi.object({
    price:joi.number().min(0),
    description:joi.string().min(0),
    name:joi.string().required(),
})

//exporting out 
module.exports = {
    productSchema,
    productUpdateSchema,
}