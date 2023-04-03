import * as fileHandler from '../modules/file';
import formats from './formats';
import ignore from './ignore';
import { schema } from './schema';

/**
 * @info Inferring type system from array of string
 */
export type FormatsUnionType = typeof formats[number]; 

export let configs:{
  ignore: string[];
  formats: string[];
  size: string | Record<FormatsUnionType, string >
} = {} as any

export const prepareConfiguration = async () => {
  const _config = {
    ignore,
    formats,
  };

  const customConfigs = await fileHandler.getConnfigurationData();

  console.log('customConfigs :', customConfigs)
  
  const {error} = await schema.validate(customConfigs);
  if (error) {
    console.warn('Invalid configuration :', error);
    throw new Error('Invalid configuration please check gallery.config file');
  }

  configs = {..._config, ...customConfigs};
};
