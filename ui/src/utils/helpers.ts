export const getSlicedString = (s:string)=>{
    if(s.length < 9) return s;
    return s.slice(0, 8) + '....'
}