import React from 'react' //rfce to start
import { useState } from 'react';
import { Link } from 'react-router-dom';

function RootBtn() {

  //hover
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  //hover end

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button id="dropdownHoverButton" class="w-[500px] h-[100px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-4xl  px-5 py-2.5 text-center inline-flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        Root Of Equation
      </button>

      { isHovered && (
        <div id="dropdownHover" class="${isHovered ? 'block' : 'hidden'} z-10 bg-white divide-y divide-gray-100 rounded-lg dark:bg-gray-700">
          <ul class="py-2 text-gray-700 dark:text-gray-200 flex flex-col items-center" aria-labelledby="dropdownHoverButton">
            <Link to="/GraphicalPage" className="text-xl w-[500px] text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Graphical method</Link>
            <Link to="/BisectionPage" className="text-xl w-[500px] text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Bisection method</Link>
            <Link to="/FalsePositionPage" className="text-xl w-[500px] text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">False Position</Link>
            <Link to="/OnePointPage" className="text-xl w-[500px] text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">One Point Iteration</Link>
            <Link to="/NewtonRaphsonPage" className="text-xl w-[500px] text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Newton Raphson</Link>
            <Link to="/SecantPage" className="text-xl w-[500px] text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Secant method</Link>
          </ul>
        </div>
      )}
    </div>
  );
}

export default RootBtn