import { createUseStyles } from 'react-jss';
import { Radio } from '../../radio';
import {
    groupingOptions,
    GROUP_BY_TYPES
} from '../types';

const useStyles = createUseStyles({});

export const FilterThree: React.FC<{
  filter: GROUP_BY_TYPES;
}> = ({filter}) => {
  return (
    <div>
      {groupingOptions.map(option => (
        <Radio label={option} isActive={filter === option} />
      ))}
    </div>
  );
};
