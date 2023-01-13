import { createUseStyles } from 'react-jss';
import { Select } from '../../select';

const useStyles = createUseStyles({});

export const FilterOne: React.FC<{
  filters: Record<string, boolean>;
  handleFilterChange: (key: string) => void;
}> = ({filters, handleFilterChange}) => {
  console.log('filters :', filters);
  return (
    <div>
      {Object.keys(filters).map(filter => (
        <Select
          key={filter}
          onClick={() => handleFilterChange(filter)}
          isActive={filters[filter]}
          label={filter}
        />
      ))}
    </div>
  );
};
