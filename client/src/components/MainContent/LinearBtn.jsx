import React from "react"; //rfce to start
import { useState } from "react";
import { Link } from "react-router-dom";

function LinearBtn() {
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
				Linear Algebra
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
							to="/CramerPage"
							className="text-xl w-[500px] text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:translate-x-[-5px] transition-all active:translate-y-[2px] rounded-md"
						>
							Cramer's Rule
						</Link>
						<Link
							to="/GaussPage"
							className="text-xl w-[500px] text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:translate-x-[-5px] transition-all active:translate-y-[2px] rounded-md"
						>
							Gauss Elimination
						</Link>
						<Link
							to="/GaussJordanPage"
							className="text-xl w-[500px] text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:translate-x-[-5px] transition-all active:translate-y-[2px] rounded-md"
						>
							Gauss Jordan
						</Link>
						<Link
							to="/MatrixInversionPage"
							className="text-xl w-[500px] text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:translate-x-[-5px] transition-all active:translate-y-[2px] rounded-md"
						>
							Matrix Inversion
						</Link>
						<Link
							to="/LUPage"
							className="text-xl w-[500px] text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:translate-x-[-5px] transition-all active:translate-y-[2px] rounded-md"
						>
							LU Decomposition
						</Link>
						<Link
							to="/CholeskyPage"
							className="text-xl w-[500px] text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:translate-x-[-5px] transition-all active:translate-y-[2px] rounded-md"
						>
							Cholesky Decomposition
						</Link>
						<Link
							to="/ConjugateGradientPage"
							className="text-xl w-[500px] text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:translate-x-[-5px] transition-all active:translate-y-[2px] rounded-md"
						>
							Conjugate Gradient
						</Link>
					</ul>
				</div>
			)}
		</div>
	);
}

export default LinearBtn;
