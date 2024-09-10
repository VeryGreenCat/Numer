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
      <RootBtn /> {/*send props : send popup and setPopup to RootBtn must be same name and order*/} 
      <LinearBtn />
    </div>
    </>
  )
}

export default MainContent