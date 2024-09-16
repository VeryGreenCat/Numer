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
      <div className="flex flex-col space-y-5">
        <RootBtn />
        <RootBtn />
      </div>
    </div>
    </>
  )
}

export default MainContent