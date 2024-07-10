import { forwardRef, useContext , useRef , useMemo , useEffect , useState } from 'react'
import './style/Product.css'
import { Theme } from '../App'
import Card from './Card'
import work from '../assets/img/work.jpg'
// IImages
import calc from '../assets/img/calculator.png'
import light from '../assets/img/light.png'
import singlePage from '../assets/img/singlePage.png'

const Product = forwardRef (( _ , ref)=>{
      const theme = useContext(Theme)
      const title = 'My Recent Work'
      const description = "Here are a few past design projects I've worked on"
      const [ element , setElement ] = useState({
            calc : true  , 
            light : false ,
            page : false ,
      })
      const first = useRef(null)
      const second = useRef(null) 
      const third = useRef(null)
      const all = useMemo(()=>{
            return [ first , second , third ]
      } , [ first.current , second.current , third.current ])
      const observer = new IntersectionObserver((entries)=>{
            entries.forEach( item => {
                  if (item.isIntersecting ) {
                        setElement({
                              calc : false , 
                              light : false ,
                              page : false ,
                        })
                        if( item.target.id === 'calc' ) {
                              setElement( items => {
                                    return {
                                          ...items ,
                                          calc : true 
                                    }
                              })
                        } else if ( item.target.id === 'light' ) {
                              setElement( items => {
                                    return {
                                          ...items ,
                                          light : true 
                                    }
                              })
                        } else {
                              setElement( items => {
                                    return {
                                          ...items ,
                                          page : true 
                                    }
                              })
                        }
                  }
            })
      } , {
            threshold :1 ,
      })
      useEffect(
            () =>{
                  all.forEach( item => {
                        if ( typeof item.current === 'object' && item.current instanceof Element )  observer.observe(item.current)
                  })
            }
      , [ first.current , second.current , third.current ])
      return (
            <article className={ theme ? 'dark-article' : ''} id='product' ref={ ref }>
                  <h1>{ title }</h1>
                  <p>{ description }</p>
                  <div className="cards-title">
                        <div className="cards-title-wrapper">
                              <p>Small portfolio to show design skill.</p>
                              <img src={ work } alt="work image" />
                        </div>
                  </div>
                  <div className="card-wrapper">
                        <div className="scroller">
                              <Card title="Calculator" id="calc"  address={ calc } ref={ first } isFocus={ element.calc } />
                              <Card title="light" id="light" address={ light } ref={ second } isFocus={ element.light } /> 
                              <Card title="simple Page" id="page" address={ singlePage } ref={ third } isFocus={ element.page } /> 
                        </div>
                  </div>
            </article>
      )
})

export default Product 