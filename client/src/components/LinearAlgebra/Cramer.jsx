import React from "react";
import { useState } from "react";

function Cramer() {
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

		setXmatrix(Calcramer(matrix, Bmatrix));
	};

	const Calcramer = (A, B) => {
		const n = A.length;
		let x = [];

		// calculate determinant
		const Anydet = (A) => {
			let det = 0;
			let n = A.length;

			if (n === 1) {
				return A[0][0];
			} else if (n === 2) {
				return A[0][0] * A[1][1] - A[0][1] * A[1][0];
			} else {
				let mainrow = 0;
				for (let i = 0; i < n; i++) {
					det += A[mainrow][i] * cofactor(A, mainrow, i);
				}
				return det;
			}
		};

		const cofactor = (A, i, j) => {
			const B = minor(A, i, j);
			return Math.pow(-1, i + j) * Anydet(B);
		};

		const minor = (A, i, j) => {
			const n = A.length;
			const B = [];
			for (let k = 0; k < n; k++) {
				if (k !== i) {
					const row = [];
					for (let l = 0; l < n; l++) {
						if (l !== j) {
							row.push(A[k][l]);
						}
					}
					B.push(row);
				}
			}
			return B;
		};
		// calculate determinant

		let detA = Anydet(A);
		if (detA === 0) {
			console.log("Matrix is singular, cannot solve using Cramer's rule.");
			return;
		}
		for (let i = 0; i < n; i++) {
			let temp = [];
			for (let j = 0; j < n; j++) {
				let temp2 = [];
				for (let k = 0; k < n; k++) {
					if (k === i) {
						temp2[k] = B[j];
					} else {
						temp2[k] = A[j][k];
					}
				}
				temp.push(temp2);
			}
			x[i] = Anydet(temp) / detA;
			x[i] = Math.round(x[i] * 1e6) / 1e6; // Rounds to 6 decimal places
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

export default Cramer;
