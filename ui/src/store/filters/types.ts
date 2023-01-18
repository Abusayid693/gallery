export const SORT_BY_SIZE = 'size';
export const SORT_BY_NAME = 'name';
export const SORT_BY_DATE = 'date';

export type SORT_BY_TYPES =
  | typeof SORT_BY_SIZE
  | typeof SORT_BY_NAME
  | typeof SORT_BY_DATE;

 export  const sortingOptions = [SORT_BY_NAME, SORT_BY_DATE, SORT_BY_SIZE];

export const GROUP_BY_FORMAT = "type"
export const GROUP_BY_DIRECTORY = "path"

export type GROUP_BY_TYPES= typeof GROUP_BY_FORMAT | typeof GROUP_BY_DIRECTORY
export const groupingOptions = [GROUP_BY_FORMAT, GROUP_BY_DIRECTORY]