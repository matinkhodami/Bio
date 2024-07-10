import { createContext, useEffect, useRef, useState , useMemo } from "react";
import "./App.css";
// Components
import Header from "./Component/Header";
import Main from "./Component/Main";
import Product from "./Component/Product";
import Talk from "./Component/Talk";
// Context
export const Theme = createContext(null)
export const ToggleTheme = createContext(null)

export default function App() { 
      const [ isDark , seIsDark ] = useState(false) 
      const toggleTheme = ()=> seIsDark(!isDark)
      const section = [ 'main', 'product' , 'talk']
      const [ whichSection , setWhichSection ] = useState(0)
      const [ isDisapear , setIsDisapear ] = useState(false)
      const sectionEl = useRef(null)
      const [ position , setPosition ] = useState('main')
      //  Sections
      const main = useRef(null)
      const product = useRef(null) 
      const talk = useRef(null)
      const all = useMemo(()=>{
            return [ main , product , talk ]
      } , [ main.current , product.current , talk.current ])
      function changeWidth(char ) {
            sectionEl.current.style.width = `${char + 1}ch`
      }
      function changeSectionName( which ) {
            changeWidth(which.length)
            setTimeout(()=>{
                  setIsDisapear(true)
            } , 300 )
            setTimeout(()=>{
                  setPosition( which )
                  setIsDisapear(false) 
            },600)
      }
      const handleClick = ( which ) => {
            if ( which === 'next' && whichSection < section.length - 1) {
                  scroll(section[ whichSection + 1])
                  setWhichSection( whichSection + 1 )
                  changeSectionName( section[ whichSection + 1] )
            } else if ( which === 'prev' && whichSection > 0  ) {
                  scroll( section[whichSection - 1] )
                  setWhichSection( whichSection - 1 )
                  changeSectionName( section[ whichSection - 1] )
            }
      }
      function scroll ( which ) {
            const choice = all.find((item)=>{
                  return item.current.id === which
            })
            choice.current.scrollIntoView({
                        behavior: 'smooth',
            })
      }
      const observer = new IntersectionObserver((entries)=>{
            entries.forEach( item => {
                  if (item.isIntersecting ) changeSectionName( item.target.id )
            })
      } , {
            threshold : 0.3 ,
      })
      
      useEffect(
            () =>{
                  all.forEach( item => {
                        if ( typeof item.current === 'object' && item.current instanceof Element )  observer.observe(item.current)
                  })
            }
      , [ main.current , product.current , talk.current ])
      return ( 
            <>
                  <Theme.Provider value={ isDark }>
                        <ToggleTheme.Provider value={ toggleTheme }>
                              <div className={ 'section ' + ( isDark ? 'dark-section ' : '' ) + ( whichSection === 0 ? 'section-bottom' : 'section-top' )}>
                                    <span onClick={ () => {
                                                handleClick('prev' )
                                          }}>
                                          <i className="fa-duotone fa-arrow-left"></i>
                                    </span>
                                    <div ref={ sectionEl } className={ isDisapear ? 'disapear' : '' }>
                                          { position.toUpperCase() }
                                    </div>
                                    <span onClick={ () => {
                                                handleClick('next' )
                                          }}>
                                          <i className="fa-duotone fa-arrow-right"></i>
                                    </span>
                              </div>
                              <Header />
                              <Main ref={ main } />
                              <Product ref={ product }/>
                              <Talk ref={ talk }/>
                        </ToggleTheme.Provider>
                  </Theme.Provider>
            </>
      ); 
}