import Joi from "joi";

export const quizValidationSchema = Joi.object({
    question: Joi.string().trim().required().messages({
      "string.empty": "Question is required.",
    }),
    options: Joi.array()
      .items(Joi.string().required())
      .length(3)
      .required()
      .messages({
        "array.length": "Exactly 3 options are required.",
        "array.base": "Options must be an array of strings.",
      }),
    answer: Joi.string().required().messages({
      "string.empty": "Answer is required.",
    }),
    // description: Joi.string().trim().optional().messages({
    //   "string.base": "Description must be a string.",
    // }),
    images: Joi.array().items(Joi.string().uri()).optional().messages({
      "array.base": "Images must be an array of strings.",
      "string.uri": "Each image must be a valid URL.",
    }),
    // response: Joi.boolean().optional().messages({
    //   "boolean.base": "Response must be true or false.",
    // }),
    category: Joi.string()
      .valid("signals", "traffic", "vehicle")
      .required()
      .messages({
        "any.only": "Category must be 'signals', 'traffic', or 'vehicle'.",
        "string.empty": "Category is required.",
      }),
    // userId: Joi.string().required().messages({
    //   "string.empty": "User ID is required.",
    // }),
  });
  