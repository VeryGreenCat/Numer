import React from "react";
import { useState } from "react";

function GaussJordan() {
	const [numFields, setNumFields] = useState(3);
	const [matrix, setMatrix] = useState([
		[-2, 3, 1],
		[3, 4, -5],
		[1, -2, 1],
	]);
	const [Xmatrix, setXmatrix] = useState(Array(3).fill("X"));
	const [Bmatrix, setBmatrix] = useState([9, 0, -4]);

	const inputNumFields = (event) => {
		const num = parseInt(event.target.value, 10) || 0;
		setNumFields(num);
		setMatrix(
			Array(num)
				.fill(null)
				.map(() => new Array(num).fill(""))
		);
		setXmatrix(Array(num).fill("X"));
		setBmatrix(Array(num).fill(""));
	};

	const MatrixValueChange = (row, col, value) => {
		const newMatrix = [...matrix];
		newMatrix[row][col] = value;
		setMatrix(newMatrix);
	};

	const BValueChange = (index, value) => {
		const newBmatrix = [...Bmatrix];
		newBmatrix[index] = value;
		setBmatrix(newBmatrix);
	};

	const handleSubmit = () => {
		console.log(matrix);
		console.log(Xmatrix);
		console.log(Bmatrix);

		setXmatrix(
			CalGaussJordan(
				matrix.map((row) => [...row]),
				[...Bmatrix]
			)
		);

		console.log(Xmatrix);
	};

	const CalGaussJordan = (A, B) => {
		const n = A.length;

		// B into A
		for (let i = 0; i < n; i++) {
			A[i].push(B[i]);
		}

		for (let i = 0; i < n; i++) {
			if (A[i][i] === 0) {
				let swapRow = i + 1;
				while (swapRow < n && A[swapRow][i] === 0) {
					swapRow++;
				}
				if (swapRow === n) {
					console.log("Error");
					return;
				}
				[A[i], A[swapRow]] = [A[swapRow], A[i]];
			}

			let makeOne = A[i][i];
			for (let j = 0; j < n + 1; j++) {
				A[i][j] /= makeOne;
			}

			for (let j = 0; j < n; j++) {
				if (j !== i) {
					let factor = A[j][i];
					for (let k = 0; k < n + 1; k++) {
						A[j][k] -= factor * A[i][k];
					}
				}
			}
		}

		let x = [];
		for (let i = 0; i < n; i++) {
			A[i][n] = Math.round(A[i][n] * 1e6) / 1e6; // Rounds to 6 decimal places
			x.push(A[i][n]);
		}

		return x;
	};

	return (
		<div className="max-w-5xl mx-auto">
			<div className="mb-4 container p-4">
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
					<h1 className="mx-2 text-2xl">Ax = B</h1>
					<div className="mt-4 max-w-5xl mx-auto inline-flex justify-center items-center">
						<div className="mx-2 space-y-2">
							{matrix.map((row, rowIndex) => (
								<div key={rowIndex} className="flex space-x-2">
									{row.map((value, colIndex) => (
										<input
											key={colIndex}
											placeholder="0"
											type="text"
											className="text-center w-11 h-11 bg-[#262626] text-[#e8e8e8] text-sm font-medium py-3 px-3 rounded-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all"
											value={value}
											onChange={(e) =>
												MatrixValueChange(rowIndex, colIndex, e.target.value)
											}
										/>
									))}
								</div>
							))}
						</div>
						<div className="mx-2 space-y-2 flex flex-col items-center">
							{Xmatrix.map((value, index) => (
								<input
									key={index}
									placeholder="0"
									type="text"
									className="text-center w-24 h-11 bg-[#262626] text-[#e8e8e8] text-sm font-medium rounded-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all"
									value={value}
									readOnly
								/>
							))}
						</div>
						<h1 className="mx-2 text-2xl">=</h1>
						<div className="mx-2 space-y-2 flex flex-col items-center">
							{Bmatrix.map((value, index) => (
								<input
									key={index}
									placeholder="0"
									type="text"
									className="text-center w-11 h-11 bg-[#262626] text-[#e8e8e8] text-sm font-medium rounded-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all"
									value={value}
									onChange={(e) => BValueChange(index, e.target.value)}
								/>
							))}
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default GaussJordan;
