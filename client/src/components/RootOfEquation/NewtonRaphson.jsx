import { useState, useEffect } from "react";
import { evaluate, derivative, max, min } from "mathjs";
import NewtonRaphsonTable from "./Table/NewtonRaphsonTable.jsx";
import Plot from "react-plotly.js";

const NewtonRaphson = () => {
	const [normalGraphData, setNormalGraphData] = useState([]);
	const [graphData, setGraphData] = useState([]);
	const [data, setData] = useState([]);
	const [Equation, setEquation] = useState("(x^3)-22");
	const [X0, setX0] = useState(1.5);
	const [Es, setEs] = useState("0.000001");
	const [Ans, setAns] = useState(0);
	const [OutputTable, setOutputTable] = useState(null);
	const [Iteration, setIteration] = useState(0); //for displaying iteration
	const [inaccuracy, setInaccuracy] = useState(100); //for displaying error

	let MAX = 50; //max iteration
	const error = (xOld, xNew) => Math.abs((xNew - xOld) / xNew) * 100;

	const CalNewton = (x0, es) => {
		let start = x0;
		let x1;
		const fx = (x) => evaluate(Equation, { x: x });
		const fdx = (x) => {
			return evaluate(derivative(Equation, "x").toString(), { x: x });
		};
		let ea = 100;
		let iter = 0;
		let obj = {};
		const e = es;
		let tempData = [];
		let representData = [];

		do {
			iter++;
			x1 = x0 - fx(x0) / fdx(x0);
			ea = error(x0, x1);
			obj = {
				X: x0,
				Y: 0,
			};
			representData.push(obj);
			obj = {
				iteration: iter,
				X: x0,
				Y: fx(x0),
				error: ea,
			};
			tempData.push(obj);
			representData.push(obj);
			x0 = x1;
		} while (ea > e && iter < MAX);

		setGraphData(representData);

		setData(tempData);
		setAns(x0);
		setIteration(iter); //for displaying iteration
		setInaccuracy(ea); //for displaying error
	};

	useEffect(() => {
		const plotNormalGraph = () => {
			const x = [];
			const y = [];
			if (data.length > 0) {
				const Max = max(data.map((d) => d.X));
				const Min = min(data.map((d) => d.X));
				for (let i = Min; i <= Max; i += 0.01) {
					x.push(i);
					y.push(evaluate(Equation, { x: i }));
				}
				setNormalGraphData({ x, y });
			}
		};
		plotNormalGraph();
	}, [data, Equation]);

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
		CalNewton(x0Num, esNum);

		setOutputTable(<NewtonRaphsonTable data={data} />);

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

	useEffect(() => {
		setOutputTable(<NewtonRaphsonTable data={data} />);
	}, [data]);

	return (
		<div className="max-w-5xl mx-auto">
			<div className="container p-4">
				<form>
					<div className="mb-4 flex justify-center space-x-4 items-center">
						<label className="text-base text-white">
							X<sub>i+1</sub> =
						</label>
						<div className="relative w-44 textInputWrapper">
							<input
								placeholder="(x^3)-22"
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
								placeholder="1.5"
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
								placeholder="0.000001"
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
				<Plot
					data={[
						{
							x: normalGraphData.x,
							y: normalGraphData.y,
							type: "scatter",
							mode: "lines",
							name: "Normal Graph",
							line: { color: "orange", width: 1 },
						},
						{
							x: graphData.map((inputX) => inputX.X),
							y: graphData.map((inputY) => inputY.Y),
							type: "scatter",
							mode: "lines+markers",
							name: "Newton Raphson",
							marker: { color: "yellow", size: 8 },
							line: { color: "red", width: 2 },
						},
					]}
					style={{
						width: "100%",
						height: "400px",
					}}
					layout={{
						title: "Newton Raphson",
						xaxis: { title: "X Axis" },
						yaxis: { title: "Y Axis" },
						dragmode: "pan",
						paper_bgcolor: "black",
						plot_bgcolor: "black",
					}}
					config={{
						displayModeBar: false, // Hide the modebar
						scrollZoom: true, // Enable zoom with scroll
						doubleClick: "reset", // Reset on double-click
						displaylogo: false, // Hide Plotly logo
					}}
					useResizeHandler={true}
				/>
				{OutputTable}
			</div>
		</div>
	);
};

export default NewtonRaphson;
