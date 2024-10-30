import React from "react";
import { useState } from "react";
import { add, subtract, multiply, dot, transpose } from "mathjs";

function ConjugateGradient() {
	const [Amatrix, setAmatrix] = useState([
		[27, 6, -1],
		[6, 15, 2],
		[1, 1, 54],
	]);
	const [Bmatrix, setBmatrix] = useState([54, 72, 110]);
	const [Xmatrix, setXmatrix] = useState(Array(3).fill("X"));
	const [X0matrix, setX0matrix] = useState([0, 0, 0]);
	const [data, setData] = useState([]);
	const [Iteration, setIteration] = useState(0);
	const [inaccuracy, setInaccuracy] = useState(100);
	const [Es, setEs] = useState("0.000001");
	const [numFields, setNumFields] = useState(3);

	const MAX = 50;
	const error = (R0) => Math.sqrt(dot(R0, R0));

	const CalconjugateGradient = (A, B, X0, es) => {
		let R0, D0, lambda, numerator, denominator, X1;
		let iter = 0;
		let tol = es;
		let obj;
		let tempData = [];

		do {
			iter++;
			R0 = subtract(B, multiply(A, X0)); // R0 = B - A * X0
			D0 = R0.map((val) => -val); //D0 = -R0

			numerator = dot(transpose(D0), R0); // D0^T * R0
			denominator = dot(transpose(D0), multiply(A, D0)); // D0^T * A * D0
			lambda = numerator / denominator;

			X1 = add(X0, multiply(lambda, D0)); // X1 = X0 + lambda * D0
			obj = {
				iteration: iter,
				X0: X0,
				R0: R0,
				D0: D0,
				lambda: lambda,
				error: error(R0),
			};
			tempData.push(obj);

			X0 = X1;
		} while (error(R0) > tol && iter < MAX);

		setData(tempData);
		setXmatrix(X1);
		setIteration(iter);
		setInaccuracy(error(R0));
	};

	const inputNumFields = (event) => {
		const num = parseInt(event.target.value, 10) || 0;
		setNumFields(num);
		setAmatrix(
			Array(num)
				.fill(null)
				.map(() => new Array(num).fill(""))
		);

		setBmatrix(Array(num).fill(""));
		setX0matrix(Array(num).fill(""));
		setXmatrix(Array(num).fill("X"));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		CalconjugateGradient(Amatrix, Bmatrix, X0matrix, Es);
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
						<label className="text-base text-white">Error:</label>
						<div className="relative w-44 textInputWrapper">
							<input
								placeholder="0.000001"
								type="text"
								className="w-full h-9 bg-[#262626] text-[#e8e8e8] text-sm font-medium py-3 px-3 rounded-t-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all"
								id="numFields"
								value={Es}
								onClick={() => setEs("")}
								onChange={(event) => setEs(event.target.value)}
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
							{Amatrix.map((row, rowIndex) => (
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

export default ConjugateGradient;
