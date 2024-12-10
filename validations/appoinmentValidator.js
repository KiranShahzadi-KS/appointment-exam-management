export const appointmentValidationSchema = Joi.object({
    title: Joi.string().trim().required().messages({
      "string.empty": "Title is required.",
    }),
    description: Joi.string().trim().optional().messages({
      "string.base": "Description must be a string.",
    }),
    scheduleDay: Joi.string()
      .valid("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")
      .required()
      .messages({
        "any.only": "Schedule Day must be a valid weekday.",
        "string.empty": "Schedule Day is required.",
      }),
    visitHour: Joi.string().required().messages({
      "string.empty": "Visit Hour is required.",
    }),
    date: Joi.date().required().messages({
      "date.base": "Invalid date format.",
      "date.empty": "Date is required.",
    }),
    userId: Joi.string().required().messages({
      "string.empty": "User ID is required.",
    }),
  });
  