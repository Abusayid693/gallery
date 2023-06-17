import { createUseStyles } from 'react-jss';
import { useAppSelector } from '../../hooks/redux';
import { images as imageTypes } from '../imges';

const useStyles = createUseStyles({
container:{
width:'100vw',
height:'100vh',
position:'fixed',
top:0,
left:0,
display:"flex",
alignItems:"center",
justifyContent:"center",
background:"rgba(0, 0, 0, 0.5)",
zIndex:10000
},

main:{
width:"80%",
height:"500px",
background:"white",
borderRadius:20,

display:"flex",
flexDirection:"row",
alignItems:"center"
},

imageSection:{
    width:"50%",
    padding:"30px",
},

image:{
    width:"100%",
    height:"100%",

},

detailsSection:{
    width:"50%"
},

    
})

export const FullView = ()=>{

    const classes = useStyles();
    const {
        filteredImages: {isGrouped, data}
      } = useAppSelector(state => state.sate);
    

    return (
        <div className={classes.container} >
            <section className={classes.main} >
                <section className={classes.imageSection} >
                    <picture className={classes.image} >
                    {imageTypes?.[data[0].type]?.({buffer: data[0].buffer, className:classes.image})}
                    </picture>
                </section>

                <section className={classes.detailsSection} >

                </section>
            </section>
        </div>
    )
}