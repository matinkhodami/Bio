import './style/Main.css'
import './style/blob.css'
import { Theme } from '../App'
import { forwardRef, useContext } from 'react'
const Main = forwardRef (( _ , ref ) => {
      const theme = useContext(Theme)
      return (
            <main className={ theme ? 'dark' : ''} id='main' ref={ ref }>
                  <div className="main-section">
                        <div className="blob">
                              <div className="blob-in"></div>
                              <div>
                                    Let's talk
                                    <i className="fa-regular fa-face-smile-relaxed"></i>
                              </div>
                        </div>
                        <div>
                              <div>
                                    Hi  <i className="fa-solid fa-hand-wave"></i>
                              </div>
                              <div>
                                    I'm Matin
                                    <span className="highlight">Khodami</span>
                              </div>
                        </div>
                        <div className="note">
                              <div>A frontend developer</div>
                              <div>I design and code beautifully simple things, and I love what I do.</div>
                        </div>
                  </div>
                  {/* <div className="title">
                        <span></span>
                        <h1>Khodami</h1>
                  </div> */}
            </main>
      )
})

export default Main