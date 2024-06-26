import Joi from "joi";

const addAppointmentSchema = Joi.object({
    name: Joi.string().required(),
    firstName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
    date: Joi.string().required(),
    message: Joi.string().required()
}).required()

const updateStatusSchema = Joi.object({
    status: Joi.string().valid("Accepté", "Refusé").required()
}).required()

export { addAppointmentSchema, updateStatusSchema }