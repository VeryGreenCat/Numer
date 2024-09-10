import React from 'react'
import { useNavigate } from 'react-router-dom';

import "../../Css/Btn.css";

function LinearBtn() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/LinearPage');
  };

  return (
    <button className="Button" onClick={handleClick}>
      Linear Algebra
    </button>
  )
}

export default LinearBtn