import { createUseStyles } from 'react-jss';
import { ImageContainer } from '../../components/box';

const useStyles = createUseStyles({
    container:{
        
    },
    groupContainer:{

    },

    groupHeader :{
        fontSize: '20px',
        fontWeight: '500',
        padding: '10px 20px',
    }
});

export const GroupRender: React.FC<{
  data: Record<string, any[]>;
}> = ({data}) => {
const classes = useStyles()
  const groupKeys = Object.keys(data);

  return (
    <div>
      {groupKeys.map(key => {
        return (
          <div className={classes.groupContainer}>
            <article className={classes.groupHeader}>{key}</article>
            {data[key].map((image, i) => {
              return <ImageContainer key={`${image.pathname}_${i}`} image={image} />;
            })}
          </div>
        );
      })}
    </div>
  );
};
