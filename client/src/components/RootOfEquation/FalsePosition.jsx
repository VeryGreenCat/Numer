import axios from "axios";
import { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import FalsePositionTable from "./Table/FalsePositionTable.jsx";
import Plot from "react-plotly.js";

const FalsePosition = () => {
	const [normalGraphData, setNormalGraphData] = useState([]);
	const [data, setData] = useState([]);
	const [Equation, setEquation] = useState("(x^4)-13");
	const [XL, setXL] = useState(0);
	const [XR, setXR] = useState(5);
	const [Es, setEs] = useState("0.000001");
	const [Ans, setAns] = useState(0);
	const [OutputTable, setOutputTable] = useState(null);
	const [Iteration, setIteration] = useState(0); //for displaying iteration
	const [inaccuracy, setInaccuracy] = useState(100); //for displaying error

	let MAX = 50; //max iteration
	const error = (xOld, xNew) => Math.abs((xNew - xOld) / xNew) * 100;

	const CalfalsePosition = (xl, xr, es) => {
		let xi, fXl, fXi, fXr, scope;
		let ea = 100;
		let iter = 0;
		const e = es;
		let obj = {};
		let tempData = [];

		do {
			iter++;

			scope = {
				x: xr, //xr is the variable
			};
			fXr = evaluate(Equation, scope);

			scope = {
				x: xl, //xl is the variable
			};
			fXl = evaluate(Equation, scope);

			xi = (xl * fXr - xr * fXl) / (fXr - fXl);

			scope = {
				x: xi, //xi is the variable
			};
			fXi = evaluate(Equation, scope);

			if (fXl * fXi < 0) {
				ea = error(xr, xi);
				obj = {
					iteration: iter,
					Xl: xl,
					Xi: xi,
					Yi: fXi,
					Xr: xr,
					error: ea,
				};
				tempData.push(obj);

				xr = xi;
			} else if (fXl * fXi > 0) {
				ea = error(xl, xi);
				obj = {
					iteration: iter,
					Xl: xl,
					Xi: xi,
					Yi: fXi,
					Xr: xr,
					error: ea,
				};
				tempData.push(obj);

				xl = xi;
			}
		} while (ea > e && iter < MAX);

		setData(tempData);
		setAns(xi);
		setIteration(iter); //for displaying iteration
		setInaccuracy(ea); //for displaying error

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

	const plotNormalGraph = (xl, xr) => {
		const x = [];
		const y = [];
		for (let i = xl; i <= xr; i += 0.01) {
			x.push(i);
			y.push(evaluate(Equation, { x: i }));
		}
		return { x, y };
	};

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
		if (Equation === "" || XL === "" || XR === "" || Es === "") {
			alert("Please fill all the fields");
			return;
		}

		console.log(`Equation: ${Equation}`);
		console.log(`XL: ${XL}`);
		console.log(`XR: ${XR}`);
		console.log(`Es: ${Es}`);

		const xlNum = parseFloat(XL);
		const xrNum = parseFloat(XR);
		const esNum = parseFloat(Es);
		CalfalsePosition(xlNum, xrNum, esNum);
		setNormalGraphData(plotNormalGraph(xlNum, xrNum));

		setOutputTable(<FalsePositionTable data={data} />);

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
		setOutputTable(<FalsePositionTable data={data} />);
	}, [data]);

	return (
		<div className="max-w-5xl mx-auto">
			<div className="container p-4">
				<form>
					<div className="mb-4 flex justify-center space-x-4 items-center">
						<label className="text-base text-white">f(x):</label>
						<div className="relative w-44 textInputWrapper">
							<input
								placeholder="(x^4)-13"
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
								placeholder="0"
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
								placeholder="5"
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
							x: data.map((inputX) => inputX.Xi),
							y: data.map((inputY) => inputY.Yi),
							type: "scatter",
							mode: "markers",
							name: "False Position",
							marker: { color: "yellow", size: 8 },
							//line: { color: "red", width: 2 },
						},
						{
							x: normalGraphData.x,
							y: normalGraphData.y,
							type: "scatter",
							mode: "lines",
							name: "Normal Graph",
							line: { color: "orange", width: 1 },
						},
					]}
					style={{
						width: "100%",
						height: "400px",
					}}
					layout={{
						title: "False Position",
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

export default FalsePosition;
