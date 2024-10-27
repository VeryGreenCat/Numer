import React from "react";
import { useState } from "react";
import Fraction from "fraction.js";

function MatrixInversion() {
	const [numFields, setNumFields] = useState(3);
	const [matrix, setMatrix] = useState([
		[-2, 3, 1],
		[3, 4, -5],
		[1, -2, 1],
	]);
	const [inverse, setInverse] = useState(null);

	const inputNumFields = (event) => {
		const num = parseInt(event.target.value, 10) || 0;
		setNumFields(num);
		setMatrix(
			Array(num)
				.fill(null)
				.map(() => new Array(num).fill(""))
		);
	};

	const MatrixValueChange = (row, col, value) => {
		const newMatrix = [...matrix];
		newMatrix[row][col] = value;
		setMatrix(newMatrix);
	};

	const handleSubmit = () => {
		console.log(matrix);
		setInverse(inverseMatrix(matrix));
		console.log(inverse);
	};

	const inverseMatrix = (A) => {
		const n = A.length;

		// (A | I)
		let mix = [];
		for (let i = 0; i < n; i++) {
			mix[i] = [];
			for (let j = 0; j < n; j++) {
				mix[i][j] = A[i][j];
			}
			for (let j = 0; j < n; j++) {
				mix[i].push(i === j ? 1 : 0); // Add identity matrix
			}
		}

		// Jordan
		for (let i = 0; i < n; i++) {
			if (mix[i][i] === 0) {
				let swapRow = i + 1;
				while (swapRow < n && mix[swapRow][i] === 0) {
					swapRow++;
				}
				if (swapRow === n) {
					console.log("Error: Singular matrix, no inverse exists");
					return null;
				}
				let temp = mix[i];
				mix[i] = mix[swapRow];
				mix[swapRow] = temp;
			}

			let pivot = mix[i][i];
			for (let j = 0; j < 2 * n; j++) {
				mix[i][j] /= pivot;
			}

			for (let j = 0; j < n; j++) {
				if (j !== i) {
					let factor = mix[j][i];
					for (let k = 0; k < 2 * n; k++) {
						mix[j][k] -= factor * mix[i][k];
					}
				}
			}
		}
		//jordan
		// Extract the inverse matrix (the right half of the mix matrix)
		let inverse = [];
		for (let i = 0; i < n; i++) {
			inverse[i] = [];
			for (let j = n; j < 2 * n; j++) {
				inverse[i].push(Fraction(mix[i][j]).toFraction());
			}
		}

		return inverse;
	};

	return (
		<div className="max-w-5xl mx-auto">
			<div className="container p-4">
				<form className="flex flex-col items-center justify-center">
					<div className="mb-4 flex justify-center space-x-4 items-center">
						<label className="text-base text-white">Input size:</label>
						<div className="relative w-44 textInputWrapper">
							<input
								placeholder="3"
								type="text"
								className="w-full h-9 bg-[#262626] text-[#e8e8e8] text-sm font-medium py-3 px-3 rounded-t-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all"
								id="numFields"
								value={numFields}
								onClick={() => setNumFields("")}
								onChange={inputNumFields}
							/>
						</div>
						<button
							type="button"
							className="w-min cursor-pointer transition-all bg-blue-600 text-white px-6 py-2 rounded-lg border-blue-700 border-b-[4px] hover:brightness-110 hover:translate-y-[-2px] active:translate-y-[2px] active:brightness-90"
							onClick={handleSubmit}
						>
							Calculate
						</button>
					</div>

					<div className="mt-4 max-w-5xl mx-auto inline-flex justify-center items-center">
						<h1 className="mx-2 text-2xl">A =</h1>
						<div className="mx-2 space-y-2">
							{matrix.map((row, rowIndex) => (
								<div key={rowIndex} className="flex space-x-2">
									{row.map((value, colIndex) => (
										<input
											key={colIndex}
											placeholder="0"
											type="text"
											className="text-center w-14 h-11 bg-[#262626] text-[#e8e8e8] text-sm font-medium py-3 px-3 rounded-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all"
											value={value}
											onChange={(e) =>
												MatrixValueChange(rowIndex, colIndex, e.target.value)
											}
										/>
									))}
								</div>
							))}
						</div>
					</div>

					{inverse && (
						<div className="mt-4 max-w-5xl mx-auto inline-flex justify-center items-center">
							<h1 className="mx-2 text-2xl">
								A<sup>-1</sup> =
							</h1>
							<div className="mx-2 space-y-2">
								{inverse.map((row, rowIndex) => (
									<div key={rowIndex} className="flex space-x-2">
										{row.map((value, colIndex) => (
											<input
												key={colIndex}
												placeholder="0"
												type="text"
												className="text-center w-24 h-11 bg-[#262626] text-[#e8e8e8] text-sm font-medium py-3 px-3 rounded-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all"
												value={value}
												readOnly // Make it read-only if it’s meant to show results
											/>
										))}
									</div>
								))}
							</div>
						</div>
					)}
				</form>
			</div>
		</div>
	);
}

export default MatrixInversion;
