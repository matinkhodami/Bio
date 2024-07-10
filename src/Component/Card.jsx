import { forwardRef } from 'react'
import './style/Card.css'
const Card = forwardRef( function Card ( { title , address , id , isFocus  } , ref ) {
      return (
            <div className={ 'card ' + ( isFocus ? 'focus' : '' ) } ref={ ref } id={ id } >
                  <div className='content'>
                        <h2>{ title }</h2>
                        <div className='img' style={{ backgroundImage : `url(${address})` }}></div>
                        <button>
                              See
                              <i className="fa-duotone fa-arrow-right"></i>
                        </button>
                  </div>
            </div>
      )
})

export default Card