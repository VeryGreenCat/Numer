import React from "react";
import { useState } from "react";

function Cholesky() {
	const [numFields, setNumFields] = useState(3);
	const [matrix, setMatrix] = useState([
		[6, 2, 1],
		[2, 3, 1],
		[1, 1, 1],
	]);
	const [Xmatrix, setXmatrix] = useState(Array(3).fill("X"));
	const [Bmatrix, setBmatrix] = useState([9, 8, 3]);
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

		const obj = Calcholesky(
			matrix.map((row) => [...row]),
			[...Bmatrix]
		);

		setXmatrix(obj.x);
		setResult(obj);
		console.log(obj);
	};

	const Calcholesky = (A, B) => {
		const n = A.length;
		const L = Array.from({ length: n }, () => Array(n).fill(0)); // Lower triangular matrix
		const x = new Array(n); // Solution array

		// Cholesky Decomposition
		for (let i = 0; i < n; i++) {
			for (let j = 0; j <= i; j++) {
				let sum = A[i][j];

				for (let k = 0; k < j; k++) {
					sum -= L[i][k] * L[j][k];
				}

				if (i === j) {
					if (sum <= 0) {
						alert("Matrix is not positive definite");
						throw new Error("Matrix is not positive definite");
					}
					L[i][j] = Math.sqrt(sum);
				} else {
					L[i][j] = sum / L[j][j];
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
			y[i] /= L[i][i];
		}

		// Backward substitution to solve L^T x = y
		for (let i = n - 1; i >= 0; i--) {
			x[i] = y[i];
			for (let j = i + 1; j < n; j++) {
				x[i] -= L[j][i] * x[j];
			}
			x[i] /= L[i][i];
		}

		// Return L, L transpose (LT), and the solution x
		return {
			L: L.map((row) => row.map((value) => Math.round(value * 1e6) / 1e6)), // Format to six decimal places
			LT: L[0].map((_, colIndex) =>
				L.map((row) => row[colIndex]).map(
					(value) => Math.round(value * 1e6) / 1e6
				)
			), // Transpose of L
			x: x.map((value) => Math.round(value * 1e6) / 1e6),
			y: y.map((value) => Math.round(value * 1e6) / 1e6),
		};
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

					{/*L LT = A*/}
					{result && (
						<div className="mt-8 max-w-5xl mx-auto justify-center items-center">
							<h1 className="text-2xl flex justify-center items-center">
								LL<sup>T</sup> = A
							</h1>
							<div className="mt-4 max-w-5xl mx-auto inline-flex justify-center items-center">
								<div className="mx-2 space-y-2">
									{result.L.map((row, rowIndex) => (
										<div key={rowIndex} className="flex space-x-2">
											{row.map((value, colIndex) => (
												<input
													key={colIndex}
													type="text"
													className="text-center w-20 h-11 bg-[#262626] text-[#e8e8e8] text-sm font-medium rounded-md shadow-lg"
													value={value}
													readOnly
												/>
											))}
										</div>
									))}
								</div>

								<div className="mx-2 space-y-2">
									{result.LT.map((row, rowIndex) => (
										<div key={rowIndex} className="flex space-x-2">
											{row.map((value, colIndex) => (
												<input
													key={colIndex}
													type="text"
													className="text-center w-20 h-11 bg-[#262626] text-[#e8e8e8] text-sm font-medium rounded-md shadow-lg"
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
													className="text-center w-20 h-11 bg-[#262626] text-[#e8e8e8] text-sm font-medium rounded-md shadow-lg"
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

					{/*LT x = y*/}
					{result && (
						<div className="mt-8 max-w-5xl mx-auto justify-center items-center">
							<h1 className="text-2xl flex justify-center items-center">
								L<sup>T</sup>x = Y
							</h1>
							<div className="mt-4 max-w-5xl mx-auto inline-flex justify-center items-center">
								<div className="mx-2 space-y-2">
									{result.LT.map((row, rowIndex) => (
										<div key={rowIndex} className="flex space-x-2">
											{row.map((value, colIndex) => (
												<input
													key={colIndex}
													type="text"
													className="text-center w-20 h-11 bg-[#262626] text-[#e8e8e8] text-sm font-medium rounded-md shadow-lg"
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

export default Cholesky;
