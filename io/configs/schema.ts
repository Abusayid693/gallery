import Joi from 'joi';
import formats from './formats';

export const schema = Joi.object({
  formats: Joi.array().items(Joi.string().valid(...formats))
});
