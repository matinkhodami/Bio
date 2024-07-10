import { useContext, useEffect, useState } from 'react'
import Type from './Type'
import { Theme } from '../App'
import ThemeToggle from './ThemeToggle'
import './style/Header.css'
export default function Header () {
      const [ animateLink , setAnimateLink ] = useState(false)
      const theme = useContext(Theme)

      const urls = [ "#" , "#" , "#"] ;
      const  copy = text  =>  navigator.clipboard.writeText( text )
      const  openLink = url=> window.open( url , '_blank'); 

      useEffect(()=>{
            setTimeout(()=>{
                  setAnimateLink(true)
            } , 2500)
      } , [])
      return(
            <header data-testid="header" className={ theme ? 'dark' : ''}>
                  <section className="left">
                        <Type firstWord={'Khodami'} needToClear={ true } howManyChar={ '2rem' }  stepBack={ 5 } />
                        <div className={ 'link ' + (animateLink === true  && 'links') }>
                              { urls.map(( url , idx )=>{
                                    return (
                                          <a href={ url } key={ idx }>
                                                { idx === 0 && <i className="fa-brands fa-telegram"></i> }
                                                { idx === 1 && <i className="fa-brands fa-linkedin"></i> }
                                                { idx === 2 && <i className="fa-brands fa-github"></i> }
                                                <span className="link-option">
                                                      <i className="fa-duotone fa-copy" onClick={ () => copy(url) }></i>
                                                      <span></span>
                                                      <i className="fa-duotone fa-arrow-up-right-from-square" onClick={ () => openLink(url) }></i>
                                                </span>
                                          </a>
                                    )
                              })}
                        </div>
                  </section>
                  <section className="right">
                        <ThemeToggle />
                  </section>
            </header>
      )
}