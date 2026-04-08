import Joi from 'joi';

export const createEmployeeBodySchema = Joi.object({
  full_name: Joi.string().trim().min(1).required(),
  job_title: Joi.string().trim().min(1).required(),
  country: Joi.string().trim().min(1).required(),
  salary: Joi.number().required().min(0),
});
