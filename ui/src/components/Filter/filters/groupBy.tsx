import { createUseStyles } from 'react-jss';
import { Radio } from '../../radio';
import { groupingOptions, GROUP_BY_TYPES } from '../types';

const useStyles = createUseStyles({});

export const FilterThree: React.FC<{
  filter: GROUP_BY_TYPES;
  handleFilterChange: (key: string) => void;
}> = ({filter, handleFilterChange}) => {
  return (
    <div>
      {groupingOptions.map(option => (
        <Radio
          onClick={() => handleFilterChange(option)}
          label={option}
          isActive={filter === option}
        />
      ))}
    </div>
  );
};
