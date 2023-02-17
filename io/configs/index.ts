import * as fileHandler from '../modules/file';
import formats from './formats';
import ignore from './ignore';
import { schema } from './schema';

export let configs:{
  ignore: string[];
  formats: string[];
} = {} as any

export const prepareConfiguration = async () => {
  const _config = {
    ignore,
    formats
  };

  const customConfigs = await fileHandler.getConnfigurationData();
  
  const {error} = await schema.validate(customConfigs);
  if (error) {
    console.warn('Invalid configuration :', error);
    throw new Error('Invalid configuration please check gallery.config file');
  }

  configs = {..._config, ...customConfigs};
};
