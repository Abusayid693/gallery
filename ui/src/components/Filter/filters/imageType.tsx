import { createUseStyles } from 'react-jss';
import { Select } from '../../select';

const useStyles = createUseStyles({});

export const FilterOne:React.FC<{
    filters: Record<string, boolean>
}> = ({filters}) => {

    console.log('filters :', filters)
  return (
    <div>
      {Object.keys(filters).map((filter)=>(
      <Select isActive={filters[filter]} label={filter} />
      ))}
    </div>
  );
};
