import Joi from "joi";

export const entryValidation = Joi.object({
  carNumber: Joi.string().min(5).required(),

  phone: Joi.string()
    .min(10)
    .pattern(/^[0-9]+$/)
    .required(),

  email: Joi.string().email().optional(),

  parkingCode: Joi.string().required(),
});

export const sessionValidation = Joi.object({
  carNumber: Joi.string().required(),

  phone: Joi.string().required(),

  parkingCode: Joi.string().required(),
});

export const paymentValidation = Joi.object({
  sessionId: Joi.string().required(),
});

export const exitValidation = Joi.object({
  sessionId: Joi.string().required(),
  parkingCode: Joi.string().required(),
});
