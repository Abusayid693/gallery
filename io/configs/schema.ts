import Joi from 'joi';
import formats from './formats';

export const schema = Joi.object({
  formats: Joi.array().items(Joi.string().valid(...formats)).empty(),
  ignore: Joi.array().items(Joi.string()).empty(),
  size: Joi.alternatives().try(Joi.object().pattern(Joi.string().valid(...formats), Joi.number().min(0)), Joi.number().min(0)).empty()
});
