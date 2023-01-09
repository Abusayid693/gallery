import formats from './formats';
import ignore from './ignore';
import { schema } from './schema';

module.exports = async () => {
  let config = {
    ignore,
    formats
  };

  const {error} = await schema.validate({formats:["svg"]});
  if (error) throw new Error('Invalid configuration');

  return config;
};
