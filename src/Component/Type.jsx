import { useState , useEffect, memo } from "react";
import'./style/typing.css'

const  Type = memo(({ firstWord , anotherWord , secondword , needToClear , howManyChar , stepBack }) => {
      const [ word , setWord] = useState(firstWord) ;
      const [ tryAgain , setTryAgain ] = useState(!anotherWord) ;
      const [ deleteTime , setDeleteTime ] = useState(false)
      useEffect(()=>{
            if ( anotherWord ) {
                  setTimeout(()=>{
                        setTryAgain(true)
                  } , 1500)
                  setTimeout(()=>{
                        setTryAgain(false)
                        setWord(secondword)
                  } , 2500)
            } else if ( needToClear ) {
                  setTimeout(()=>{
                        setDeleteTime(true)
                  } , 1500)
            }
      } , [])
      if ( anotherWord ) {
            return ( 
                  <div className={ 'typing ' + (tryAgain ? 'back' : 'forward') } style={{ '--length' : word.length  }} >
                        { word }
                  </div>
            )
      } else if ( needToClear ) {
            return (
                  <div className={ 'typing ' + ( !deleteTime ? 'forward' : 'delete' ) } style={{ '--length' : word.length , '--letter' : howManyChar , '--stepBack' : stepBack   }} >
                        { word }
                  </div>
            )
      }
      
})
export default Type