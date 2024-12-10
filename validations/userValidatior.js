import Joi from "joi";

export const userValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Name is required.",
  }),
  email: Joi.string().email().trim().required().messages({
    "string.email": "Invalid email format.",
    "string.empty": "Email is required.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long.",
    "string.empty": "Password is required.",
  }),
  address: Joi.string().trim().required().messages({
    "string.empty": "Address is required.",
  }),
  drivingLicense: Joi.string()
    .valid("no", "yes")
    .required()
    .messages({
      "any.only": "Driving License must be 'no' or 'yes'.",
      "string.empty": "Driving License status is required.",
    }),
  userType: Joi.string()
    .valid("public", "private")
    .required()
    .messages({
      "any.only": "User Type must be 'public' or 'private'.",
      "string.empty": "User Type is required.",
    }),
});
