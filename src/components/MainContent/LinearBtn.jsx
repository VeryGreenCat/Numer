import React from 'react'
import { useNavigate } from 'react-router-dom';

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