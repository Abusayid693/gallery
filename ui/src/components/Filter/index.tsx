import {createUseStyles} from 'react-jss';
import filterIcon from "../../assets/filter.svg"
import {Slider} from "../slider"
import {FilterOne} from "./filters/imageType"
import {FilterTwo} from "./filters/sort"

const useStyles = createUseStyles({
  constainer: {
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#fff',
    position: 'sticky',
    top: 0,
    left: 0,
    borderRight:'1px solid #EDEEF7',
    borderTop:'1px solid #EDEEF7',
    borderBottom:'1px solid #EDEEF7'
  },
  filterHeader:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:"flex-start",
    backgroundColor:'#FAFAFC',
    padding:'1rem 0 1rem 0.5rem',
    gap:'7px',
    fontWeight:'500',

    '& img':{
        width:'1rem',
        height:'1.8rem',
    },
    '& span':{
        fontSize:'19px'
    }
  },
  filterBody:{

  }
});

export const Filter = () => {
  const classes = useStyles();
  return (
    <div className={classes.constainer}>
      <div className={classes.filterHeader}>
        <img  src={filterIcon}/>
        <span>Filters</span>
      </div>
      <div className={classes.filterBody}>
        <Slider title='Home'>
            <FilterOne/>
        </Slider>
        <Slider title='Types'>
            <FilterTwo/>
        </Slider>
      </div>
    </div>
  );
};
