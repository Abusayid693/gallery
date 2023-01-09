import { createUseStyles } from 'react-jss';
import { Select } from '../../select';

const useStyles = createUseStyles({

})

export const FilterOne = ()=>{
    return (
        <div>
            <Select isActive={false}  label='Types'/>
            <Select isActive={false} label='Types'/>
            <Select label='Types'/>
        </div>
    )
}