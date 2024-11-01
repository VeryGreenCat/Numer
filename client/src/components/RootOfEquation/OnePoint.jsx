import axios from "axios";
import { useState, useEffect } from "react";
import { evaluate, max, min } from "mathjs";
import OnePointTable from "./Table/OnePointTable.jsx";
import Plot from "react-plotly.js";

const OnePoint = () => {
	const [normalGraphData, setNormalGraphData] = useState([]);
	const [graphData, setGraphData] = useState([]);
	const [data, setData] = useState([]);
	const [Equation, setEquation] = useState("cos(x)");
	const [X0, setX0] = useState(2);
	const [Es, setEs] = useState("0.000001");
	const [Ans, setAns] = useState(0);
	const [OutputTable, setOutputTable] = useState(null);
	const [Iteration, setIteration] = useState(0); //for displaying iteration
	const [inaccuracy, setInaccuracy] = useState(100); //for displaying error

	let MAX = 50; //max iteration
	const error = (xOld, xNew) => Math.abs((xNew - xOld) / xNew) * 100;

	const CalOnePoint = (x0, es) => {
		let start = x0;
		let x1;
		const fx = (x) => evaluate(Equation, { x: x });
		let e = es;
		let eOld = 100;
		let eNew = 100;
		let iter = 0;
		let obj = {};
		let tempData = [];
		let representData = [];

		do {
			iter++;
			x1 = fx(x0);
			eNew = error(x0, x1);
			console.log(x1);

			if (Math.abs(x1) > 1e6) {
				alert("Divergence detected: stopping calculation");
				break; // Stop if divergence is detected
			}

			obj = {
				iteration: iter,
				X: x0,
				Y: fx(x0),
				error: eNew,
			};
			tempData.push(obj);
			representData.push(obj);

			obj = {
				X: x0,
				Y: x0,
			};
			representData.push(obj); //use for representing graph
			x0 = x1;
			eOld = eNew;
		} while (eNew > e && iter < MAX);

		setGraphData(representData);

		setData(tempData);
		setAns(x0);
		setIteration(iter); //for displaying iteration
		setInaccuracy(eOld); //for displaying error

		axios
			.post(
				`${import.meta.env.VITE_API_URL}/save/rootequation/all`,
				{
					equation: Equation,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((res) => {
				//setSuccessText("Saved");
				console.log("saved success");
			})
			.catch((err) => {
				if (err.response) {
					//setErrorText(`${err.response.data.message}`);
					console.log("err.response.data.message");
				} else if (err.request) {
					//setErrorText("Server Down");
					console.log("Server Down");
				} else {
					// setErrorText(`Error: ${err.message}`);
					console.log("Error:", err.message);
				}
			});
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

	useEffect(() => {
		setOutputTable(<OnePointTable data={data} />);
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
								placeholder="cos(x)"
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
								placeholder="2"
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
							name: "One Point Iteration",
							marker: { color: "yellow", size: 8 },
							line: { color: "red", width: 2 },
						},
					]}
					style={{
						width: "100%",
						height: "400px",
					}}
					layout={{
						title: "One Point Iteration",
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
				/>

				{OutputTable}
			</div>
		</div>
	);
};

export default OnePoint;
