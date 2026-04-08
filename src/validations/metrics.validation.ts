import Joi from 'joi';

export const countryMetricsQuerySchema = Joi.object({
  name: Joi.string().trim().min(1).required().label('name'),
});

export const jobMetricsQuerySchema = Joi.object({
  title: Joi.string().trim().min(1).required().label('title'),
});
