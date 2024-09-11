import React from 'react' //rfce to start
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import "../../Css/Btn.css"; //import css not use yet

function RootBtn() {

  const navigate = useNavigate();

  //hover
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  //hover end

  const handleClick = () => {
    navigate('/RootPage');
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" class="mt-6 mb-3 w-[500px] h-[100px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-4xl  px-5 py-2.5 text-center inline-flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        Root Of Equation
      </button>

      { isHovered && (
        <div id="dropdownHover" class="z-10 ${isHovered ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg dark:bg-gray-700">
          <ul class="py-2 text-gray-700 dark:text-gray-200 flex flex-col items-center" aria-labelledby="dropdownHoverButton">
            <Link to="/BisectionPage" className="text-xl w-[500px] text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Graphical method</Link>
            <Link to="/Bisection" className="text-xl w-[500px] text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Bisection method</Link>
            <Link to="/Bisection" className="text-xl w-[500px] text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">False Position</Link>
            <Link to="/Bisection" className="text-xl w-[500px] text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">One Point Iteration</Link>
            <Link to="/Bisection" className="text-xl w-[500px] text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Newton Raphson</Link>
            <Link to="/Bisection" className="text-xl w-[500px] text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Secant method</Link>
          </ul>
        </div>
      )}
    </div>
  );
}

export default RootBtn