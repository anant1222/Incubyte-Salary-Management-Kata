import Joi from 'joi';

export const createEmployeeBodySchema = Joi.object({
  full_name: Joi.string().required(),
  job_title: Joi.string().required(),
  country: Joi.string().required(),
  salary: Joi.number().required(),
});
