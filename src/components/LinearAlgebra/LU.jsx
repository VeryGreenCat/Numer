import Fraction from "fraction.js";
import React from "react";
import { useState } from "react";

function LU() {
	const [numFields, setNumFields] = useState(3);
	const [matrix, setMatrix] = useState([
		[-2, 3, 1],
		[3, 4, -5],
		[1, -2, 1],
	]);
	const [Xmatrix, setXmatrix] = useState(Array(3).fill("X"));
	const [Bmatrix, setBmatrix] = useState([9, 0, -4]);
	const [result, setResult] = useState(null);

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

		const obj = CalLU(
			matrix.map((row) => [...row]),
			[...Bmatrix]
		);

		setXmatrix(obj.x);
		setResult(obj);
		console.log(obj);
	};

	function CalLU(A, B) {
		const n = A.length;
		const L = Array.from({ length: n }, () => Array(n).fill(0)); // Lower triangular matrix
		const U = Array.from({ length: n }, () => Array(n).fill(0)); // Upper triangular matrix
		const x = new Array(n); // Solution array

		// LU Decomposition
		for (let i = 0; i < n; i++) {
			for (let j = i; j < n; j++) {
				U[i][j] = A[i][j]; // Upper part
				for (let k = 0; k < i; k++) {
					U[i][j] -= L[i][k] * U[k][j]; // Subtract previous contributions
				}
			}

			for (let j = i; j < n; j++) {
				if (i === j) {
					L[i][i] = 1; // Diagonal elements are 1
				} else {
					L[j][i] = A[j][i]; // Lower part
					for (let k = 0; k < i; k++) {
						L[j][i] -= L[j][k] * U[k][i]; // Subtract previous contributions
					}
					L[j][i] /= U[i][i]; // Normalize
				}
			}
		}

		// Forward substitution to solve Ly = B
		const y = new Array(n);
		for (let i = 0; i < n; i++) {
			y[i] = B[i];
			for (let j = 0; j < i; j++) {
				y[i] -= L[i][j] * y[j];
			}
		}

		// Backward substitution to solve Ux = y
		for (let i = n - 1; i >= 0; i--) {
			x[i] = y[i];
			for (let j = i + 1; j < n; j++) {
				x[i] -= U[i][j] * x[j];
			}
			x[i] /= U[i][i]; // Normalize
		}

		// Return an object containing L, U, and x
		return {
			L: L.map((row) => row.map((value) => Fraction(value).toFraction())),
			U: U.map((row) => row.map((value) => Fraction(value).toFraction())),
			x: x.map((value) => Fraction(value).toFraction()),
			y: y.map((value) => Fraction(value).toFraction()),
		};
	}

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

					{/*Ax = B*/}
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

					{/*LU = A*/}
					{result && (
						<div className="mt-8 max-w-5xl mx-auto justify-center items-center">
							<h1 className="text-2xl flex justify-center items-center">
								LU = A
							</h1>
							<div className="mt-4 max-w-5xl mx-auto inline-flex justify-center items-center">
								<div className="mx-2 space-y-2">
									{result.L.map((row, rowIndex) => (
										<div key={rowIndex} className="flex space-x-2">
											{row.map((value, colIndex) => (
												<input
													key={colIndex}
													type="text"
													className="text-center w-16 h-11 bg-[#262626] text-[#e8e8e8] text-sm font-medium rounded-md shadow-lg"
													value={value}
													readOnly
												/>
											))}
										</div>
									))}
								</div>

								<div className="mx-2 space-y-2">
									{result.U.map((row, rowIndex) => (
										<div key={rowIndex} className="flex space-x-2">
											{row.map((value, colIndex) => (
												<input
													key={colIndex}
													type="text"
													className="text-center w-16 h-11 bg-[#262626] text-[#e8e8e8] text-sm font-medium rounded-md shadow-lg"
													value={value}
													readOnly
												/>
											))}
										</div>
									))}
								</div>
								<h1 className="mx-2 text-2xl">=</h1>
								<div className="mx-2 space-y-2">
									{matrix.map((row, rowIndex) => (
										<div key={rowIndex} className="flex space-x-2">
											{row.map((value, colIndex) => (
												<input
													key={colIndex}
													type="text"
													className="text-center w-11 h-11 bg-[#262626] text-[#e8e8e8] text-sm font-medium rounded-md shadow-lg"
													value={value}
													readOnly
												/>
											))}
										</div>
									))}
								</div>
							</div>
						</div>
					)}

					{/*LY = B*/}
					{result && (
						<div className="mt-8 max-w-5xl mx-auto justify-center items-center">
							<h1 className="text-2xl flex justify-center items-center">
								LY = B
							</h1>
							<div className="mt-4 max-w-5xl mx-auto inline-flex justify-center items-center">
								<div className="mx-2 space-y-2">
									{result.L.map((row, rowIndex) => (
										<div key={rowIndex} className="flex space-x-2">
											{row.map((value, colIndex) => (
												<input
													key={colIndex}
													type="text"
													className="text-center w-16 h-11 bg-[#262626] text-[#e8e8e8] text-sm font-medium rounded-md shadow-lg"
													value={value}
													readOnly
												/>
											))}
										</div>
									))}
								</div>

								<div className="mx-2 space-y-2 flex flex-col items-center">
									{result.y.map((value, index) => (
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
											readOnly
										/>
									))}
								</div>
							</div>
						</div>
					)}

					{/*Ux = y*/}
					{result && (
						<div className="mt-8 max-w-5xl mx-auto justify-center items-center">
							<h1 className="text-2xl flex justify-center items-center">
								Ux = Y
							</h1>
							<div className="mt-4 max-w-5xl mx-auto inline-flex justify-center items-center">
								<div className="mx-2 space-y-2">
									{result.U.map((row, rowIndex) => (
										<div key={rowIndex} className="flex space-x-2">
											{row.map((value, colIndex) => (
												<input
													key={colIndex}
													type="text"
													className="text-center w-16 h-11 bg-[#262626] text-[#e8e8e8] text-sm font-medium rounded-md shadow-lg"
													value={value}
													readOnly
												/>
											))}
										</div>
									))}
								</div>

								<div className="mx-2 space-y-2 flex flex-col items-center">
									{result.x.map((value, index) => (
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
									{result.y.map((value, index) => (
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
							</div>
						</div>
					)}
				</form>
			</div>
		</div>
	);
}

export default LU;
