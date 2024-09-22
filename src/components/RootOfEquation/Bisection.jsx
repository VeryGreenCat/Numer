import { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import BisectionTable from "./Table/BisectionTable.jsx";

const Bisection = () => {
	const error = (xOld, xNew) => Math.abs((xNew - xOld) / xNew) * 100;

	const Calbisection = (xl, xr, es) => {
		let xm, fXm, fXr, ea, scope;
		let iter = 0;
		let MAX = 500;
		const e = es;
		let obj = {};

		do {
			xm = (xl + xr) / 2.0;
			iter++;

			scope = {
				x: xr, //xr is the variable
			};
			fXr = evaluate(Equation, scope);

			scope = {
				x: xm, //xm is the variable
			};
			fXm = evaluate(Equation, scope);

			if (fXm * fXr > 0) {
				ea = error(xr, xm);
				obj = {
					iteration: iter,
					Xl: xl,
					Xm: xm,
					Xr: xr,
					error: ea,
				};
				data.push(obj);

				xr = xm;
			} else if (fXm * fXr < 0) {
				ea = error(xl, xm);
				obj = {
					iteration: iter,
					Xl: xl,
					Xm: xm,
					Xr: xr,
					error: ea,
				};
				data.push(obj);

				xl = xm;
			}
		} while (ea > e && iter < MAX);
		setAns(xm);
		setIteration(iter); //for displaying iteration
		setInaccuracy(ea); //for displaying error
	};

	const data = [];
	const [Equation, setEquation] = useState("(x^4)-13");
	const [XL, setXL] = useState(0);
	const [XR, setXR] = useState(10);
	const [Es, setEs] = useState("0.000001");
	const [Ans, setAns] = useState(0);
	const [OutputTable, setOutputTable] = useState(null);
	const [Iteration, setIteration] = useState(0); //for displaying iteration
	const [inaccuracy, setInaccuracy] = useState(100); //for displaying error

	const inputEquation = (event) => {
		setEquation(event.target.value);
	};

	const inputXL = (event) => {
		setXL(event.target.value);
	};

	const inputXR = (event) => {
		setXR(event.target.value);
	};

	const inputEs = (event) => {
		setEs(event.target.value);
	};

	const calculateRoot = () => {
		console.log(`Equation: ${Equation}`);
		console.log(`XL: ${XL}`);
		console.log(`XR: ${XR}`);
		console.log(`Es: ${Es}`);

		const xlNum = parseFloat(XL);
		const xrNum = parseFloat(XR);
		const esNum = parseFloat(Es);
		Calbisection(xlNum, xrNum, esNum);

		setOutputTable(<BisectionTable data={data} />);

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
						<label className="text-base text-white">XL:</label>
						<div className="relative w-44 m-3 textInputWrapper">
							<input
								placeholder="XL"
								type="text"
								className="w-full h-9 bg-[#292929] text-[#e8e8e8] text-sm font-medium py-3 px-3 rounded-t-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all"
								id="XL"
								value={XL}
								onClick={() => setXL("")}
								onChange={inputXL}
							/>
						</div>
						<label className="text-base text-white">XR:</label>
						<div className="relative w-44 m-3 textInputWrapper">
							<input
								placeholder="XR"
								type="text"
								className="w-full h-9 bg-[#292929] text-[#e8e8e8] text-sm font-medium py-3 px-3 rounded-t-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all"
								id="XR"
								value={XR}
								onClick={() => setXR("")}
								onChange={inputXR}
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
					{Iteration == 500 ? "Max" : Iteration} | Error ={" "}
					{inaccuracy.toPrecision(7)}
				</h5>
				{OutputTable}
			</div>
		</div>
	);
};

export default Bisection;
