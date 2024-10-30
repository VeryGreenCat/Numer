import React from "react"; //rfce to start
import { useState } from "react";
import { Link } from "react-router-dom";

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
			<button
				id="dropdownHoverButton"
				className="w-[500px] h-[100px] bg-blue-700 hover:bg-blue-800  rounded-lg text-4xl px-5 py-2.5 text-center inline-flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 hover:translate-y-[-2px] transition-all active:translate-y-[2px]"
				type="button"
			>
				Root Of Equation
			</button>

			{isHovered && (
				<div
					id="dropdownHover"
					className="${isHovered ? 'block' : 'hidden'} z-10 bg-white divide-y divide-gray-100 rounded-lg dark:bg-gray-700"
				>
					<ul
						className="py-2 text-gray-700 dark:text-gray-200 flex flex-col items-center"
						aria-labelledby="dropdownHoverButton"
					>
						<Link
							to="/GraphicalPage"
							className="text-xl w-[500px] text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:translate-x-[-5px] transition-all active:translate-y-[2px] rounded-md"
						>
							Graphical method
						</Link>
						<Link
							to="/BisectionPage"
							className="text-xl w-[500px] text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:translate-x-[-5px] transition-all active:translate-y-[2px] rounded-md"
						>
							Bisection method
						</Link>
						<Link
							to="/FalsePositionPage"
							className="text-xl w-[500px] text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:translate-x-[-5px] transition-all active:translate-y-[2px] rounded-md"
						>
							False Position
						</Link>
						<Link
							to="/OnePointPage"
							className="text-xl w-[500px] text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:translate-x-[-5px] transition-all active:translate-y-[2px] rounded-md"
						>
							One Point Iteration
						</Link>
						<Link
							to="/NewtonRaphsonPage"
							className="text-xl w-[500px] text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:translate-x-[-5px] transition-all active:translate-y-[2px] rounded-md"
						>
							Newton Raphson
						</Link>
						<Link
							to="/SecantPage"
							className="text-xl w-[500px] text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:translate-x-[-5px] transition-all active:translate-y-[2px] rounded-md"
						>
							Secant method
						</Link>
					</ul>
				</div>
			)}
		</div>
	);
}

export default RootBtn;
