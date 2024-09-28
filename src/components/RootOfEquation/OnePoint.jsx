import { useState, useEffect } from "react";
import { evaluate, derivative } from "mathjs";
import OnePointTable from "./Table/OnePointTable.jsx";

const OnePoint = () => {
	let MAX = 50; //max iteration
	const error = (xOld, xNew) => Math.abs((xNew - xOld) / xNew) * 100;

	const CalOnePoint = (x0, es) => {
		let x1;
		const fx = (x) => evaluate(Equation, { x: x });
		let e = es;
		let eOld = 100;
		let eNew = 100;
		let iter = 0;
		let obj = {};

		do {
			iter++;
			x1 = fx(x0);
			eNew = error(x0, x1);
			obj = {
				iteration: iter,
				X: x0,
				Y: fx(x0),
				error: eNew,
			};
			data.push(obj);
			x0 = x1;
			eOld = eNew;
		} while (eNew > e && iter < MAX);

		setAns(x0);
		setIteration(iter); //for displaying iteration
		setInaccuracy(eOld); //for displaying error
	};

	const data = [];
	const [Equation, setEquation] = useState("cos(x)");
	const [X0, setX0] = useState(2);
	const [Es, setEs] = useState("0.000001");
	const [Ans, setAns] = useState(0);
	const [OutputTable, setOutputTable] = useState(null);
	const [Iteration, setIteration] = useState(0); //for displaying iteration
	const [inaccuracy, setInaccuracy] = useState(100); //for displaying error

	const inputEquation = (event) => {
		setEquation(event.target.value);
	};

	const inputX0 = (event) => {
		setX0(event.target.value);
	};

	const inputEs = (event) => {
		setEs(event.target.value);
	};

	const calculateRoot = () => {
		if (Equation === "" || X0 === "" || Es === "") {
			alert("Please fill all the fields");
			return;
		}
		console.log(`Equation: ${Equation}`);
		console.log(`X0: ${X0}`);
		console.log(`Es: ${Es}`);

		const x0Num = parseFloat(X0);
		const esNum = parseFloat(Es);
		CalOnePoint(x0Num, esNum);

		setOutputTable(<OnePointTable data={data} />);

		console.log(data);
	};

	// Handle Enter Key Press
	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			calculateRoot();
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", handleKeyPress);
		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, [handleKeyPress]);

	return (
		<div className="max-w-5xl mx-auto">
			<div className="container p-4">
				<form>
					<div className="mb-4 flex justify-center space-x-4 items-center">
						<label className="text-base text-white">f(x):</label>
						<div className="relative w-44 textInputWrapper">
							<input
								placeholder="Enter Equation"
								type="text"
								className="w-full h-9 bg-[#262626] text-[#e8e8e8] text-sm font-medium py-3 px-3 rounded-t-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all"
								id="equation"
								value={Equation}
								onClick={() => setEquation("")}
								onChange={inputEquation}
							/>
						</div>
						<label className="text-base text-white">X0:</label>
						<div className="relative w-44 m-3 textInputWrapper">
							<input
								placeholder="X0"
								type="text"
								className="w-full h-9 bg-[#292929] text-[#e8e8e8] text-sm font-medium py-3 px-3 rounded-t-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all"
								id="X0"
								value={X0}
								onClick={() => setX0("")}
								onChange={inputX0}
							/>
						</div>
						<label className="text-base text-white">Error:</label>
						<div className="relative w-44 m-3 textInputWrapper">
							<input
								placeholder="Error Stop"
								type="text"
								className="w-full h-9 bg-[#292929] text-[#e8e8e8] text-sm font-medium py-3 px-3 rounded-t-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all"
								id="Es"
								value={Es}
								onClick={() => setEs("")}
								onChange={inputEs}
							/>
						</div>
					</div>

					<button
						type="button"
						className="mb-4 w-min cursor-pointer transition-all bg-blue-600 text-white px-6 py-2 rounded-lg border-blue-700 border-b-[4px] hover:brightness-110 hover:translate-y-[-2px] active:translate-y-[2px] active:brightness-90"
						onClick={calculateRoot}
					>
						Calculate
					</button>
				</form>

				<h5 className="mb-4 text-white bg-gray-800 rounded-lg p-4 border-2 border-[#262626] flex justify-center">
					Answer = {Ans.toPrecision(7)} | Total Iteration ={" "}
					{Iteration == MAX ? "Max" : Iteration} | Error ={" "}
					{inaccuracy.toPrecision(7)}
				</h5>
				{OutputTable}
			</div>
		</div>
	);
};

export default OnePoint;
