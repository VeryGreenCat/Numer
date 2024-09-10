import React from 'react' //rfce to start
import { useNavigate } from 'react-router-dom';

import "../../Css/Btn.css"; //import css

function RootBtn() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/RootPage');
  };

  return (
    <button className="Button" onClick={handleClick}>
      Root Of Equation
    </button>
  )
}

export default RootBtn