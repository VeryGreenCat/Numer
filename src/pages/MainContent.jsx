import React from 'react'

import RootBtn from '../components/MainContent/RootBtn'
import LinearBtn from '../components/MainContent/LinearBtn'

//import css
import "../Css/MainContent.css"

function MainContent() {
  return (
    <>
    <div className="window">
      <h1 className='header'>NUMERICAL METHOD</h1>
      <RootBtn />
      <RootBtn />
    </div>
    </>
  )
}

export default MainContent