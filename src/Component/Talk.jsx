import { forwardRef  , useReducer , useRef, useState , useContext } from "react";
import { Theme } from '../App'
import './style/Talk.css'
import useIsTyping from './useIsTypngFunc' 
import { typingText } from "./useIsTypngFunc";

const Talk = forwardRef ( function Talk ( _ , ref ){
      const theme = useContext(Theme)
      const title = "Let's talk..."
      const [ errMail, setErrorMail ] = useState('')
      const [ errName , setErrName ] = useState('')
      const [ errLastName , setErrLastName ] = useState('')

      //  Is Typing Validator
      const name = useRef(null)
      const lastName = useRef(null)
      const email = useRef(null)

      const isTypingName = useIsTyping( name.current )
      const isTypingLastName = useIsTyping( lastName.current )
      const isTypingEmail = useIsTyping( email.current )

      const validByType = ( type , value ) => {
            switch ( type ) {
                  case 'name' :
                        if ( value.length < 3 ) { 
                              setErrName('There must be at least three letters !')
                              return false 
                        }
                        setErrName('Everything Ok')
                        return true 
                        break;
                  case 'lastName' :
                        if ( value.length < 3 ) { 
                              setErrLastName('There must be at least three letters !')
                              return false 
                        }
                        setErrLastName('Everything Ok')
                        return true 
                        break;
                  case 'email' :
                        if (
                              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test( value )
                        ) {
                              setErrorMail( 'Correct Email.' )
                              return true
                        }     
                        setErrorMail( 'Invalid Email !')
                        return false 
                        break
            }
      }
      
      const reduce = ( state , { type , text  } ) => {
            return {
                  ...state ,
                  [ type ] : { 'isOk' : validByType( type , text )  , 'value' : text }
            }
      }
      const data = {
            name : { value : '' , isOk : null } ,
            lastName : { value : '' , isOk : null },
            email : { value : '' , isOk : null } ,
            message : { value : '' , isOk : null }
      }
      const [ state , dispatch ] = useReducer( reduce , data )

      const handleIcon = ( situation , isTyping  ) => {
            if( isTyping ) {
                  return <i class="fa-duotone fa-typewriter"></i>
            } else if ( situation ) {
                  return <i className="fa-duotone fa-memo-circle-check"></i>
            } else  {
                  return <i className="fa-duotone fa-circle-exclamation"></i>
            }
      }
      return (
            <div ref={ref} className={ 'talk' +  ( theme ? ' dark-talk' : '') } id="talk">
                  <h1>{title}</h1>
                  <form>
                        <div className={ 'form-section ' + ( 
                              errName || errLastName || isTypingName ? 'with-message' : ''
                        )}>
                              <fieldset>
                                    <label htmlFor="name">Name</label>
                                    <input
                                          type="text"
                                          id="name"
                                          placeholder="name"
                                          ref={ name }
                                          value={ state?.name.value }
                                          onChange={(e) => {
                                                dispatch({ type: "name", text: e.target.value }) 
                                          }}
                                    />
                                    <p className={ 'message ' + 
                                          ( isTypingName ? 'type ' : '') +
                                          ( state.name.isOk && !isTypingName   ? 'correct' : '' ) +
                                          ( state.name.isOk === false  && !isTypingName  ? 'err' : '')}>
                                          <span>
                                                { handleIcon( state.name.isOk , isTypingName ) } { typingText( isTypingName , errName ) } 
                                          </span>
                                    </p>
                              </fieldset>
                              <fieldset>
                                    <label htmlFor="lastname">Last name</label>
                                    <input
                                          type="text"
                                          id="lastname"
                                          placeholder="last name"
                                          value={ state?.lastName.value }
                                          ref={ lastName }
                                          onChange={(e) =>
                                                dispatch({ type: "lastName", text: e.target.value })
                                          }
                                    />
                                    <p className={ 'message ' + 
                                          ( isTypingLastName ? 'type ' : '' ) +
                                          ( state.lastName.isOk && !isTypingLastName ?  'correct' : '' ) + 
                                          ( state.lastName.isOk === false && !isTypingLastName ? 'err' : '' )}>
                                          <span>
                                                { handleIcon( state.lastName.isOk , isTypingLastName ) } { typingText( isTypingLastName , errLastName ) } 
                                          </span>
                                    </p>
                              </fieldset>
                        </div>
                        <div className={ 'form-section ' + ( 
                              errMail ? 'with-message' : ''
                        )}>
                              <fieldset>
                                    <label htmlFor="email">Email</label>
                                    <input
                                          type="email"
                                          id="email"
                                          placeholder="write your email here"
                                          value={ state?.email.value }
                                          ref={ email }
                                          onChange={(e) =>
                                                dispatch({ type: "email", text: e.target.value })
                                          }
                                    />
                                    <p className={ 'message ' +
                                          ( isTypingEmail ? 'type' : '' ) +  
                                          ( state.email.isOk === false && !isTypingEmail ? 'err' : ''  ) + 
                                          ( state.email.isOk && !isTypingEmail ? 'correct' : '' )}>
                                          <span>
                                                { handleIcon( state.email.isOk , isTypingEmail ) } { typingText( isTypingEmail , errMail ) } 
                                          </span>
                                    </p>
                              </fieldset>
                        </div>
                        <div className="form-section">
                              <fieldset>
                                    <label htmlFor="message">Your message </label>
                                    <textarea
                                          name="message"
                                          id="message"
                                          placeholder="write your message here"
                                          value={ state?.message.value }
                                          onChange={(e) =>
                                                dispatch({ type: "message", text: e.target.value })
                                          }></textarea>
                                    <p className="message"></p>
                              </fieldset>
                        </div>
                        <button>
                              Submit
                              <i className="fa-duotone fa-arrow-right"></i>
                        </button>
                  </form>
            </div>
      );
}) 
export default Talk 