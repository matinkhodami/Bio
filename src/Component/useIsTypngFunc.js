import { useState } from "react";
export default function useIsTyping ( element  ) {
      const [ isTyping , setIsTyping ] = useState( false )
      const [ prevValue , setPrevValue ] = useState('') 
      
      if ( element instanceof HTMLElement && element instanceof HTMLInputElement ) {
            if ( prevValue !== element.value ) {
                  setPrevValue( element.value )
                  setIsTyping( true )
            } 
            setTimeout(()=>{
                  if ( prevValue === element.value && isTyping ) setIsTyping( false )
            } , 1000 )
            return isTyping 
      }
}
export function typingText( condition , message ) {
      const [ text , setText ] = useState( '' )
      const [ i , setI ] = useState(0) 
      if ( condition ) {
            setTimeout(()=>{
                  switch ( i % 3 ) {
                        case 0 : 
                              setText(' checking .')
                              break 
                        case 1 : 
                              setText(' checking ..')
                              break
                        case 2 : 
                              setText(' checking ...')
                              break
                  }
                  setI( i + 1)
            } , 400)
      } else {
            return ' ' + message
      }
      
      return text
}
