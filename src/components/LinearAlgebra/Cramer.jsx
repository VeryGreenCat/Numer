import React from "react";

function Cramer() {
	let A = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
	];
	let B = [1, 2, 3];
	const calCramer = (A, B) => {
		let x = [];
	};

	return (
		<div className="max-w-5xl mx-auto">
			<div className="container p-4">
				<form>
					<div className="mb-4 flex justify-center space-x-4 items-center">
						<label className="text-base text-white">Metrix size:</label>
						<div className="relative w-10 textInputWrapper">
							<input
								placeholder="3"
								type="text"
								className="w-full h-9 bg-[#262626] text-[#e8e8e8] text-sm font-medium py-3 px-3 rounded-t-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all"
								id="equation"
								value={""}
								onClick={() => setEquation("")}
								onChange={""}
							/>
						</div>
					</div>

					<button
						type="button"
						className="mb-4 w-min cursor-pointer transition-all bg-blue-600 text-white px-6 py-2 rounded-lg border-blue-700 border-b-[4px] hover:brightness-110 hover:translate-y-[-2px] active:translate-y-[2px] active:brightness-90"
						onClick={""}
					>
						Calculate
					</button>
				</form>
			</div>
		</div>
	);
}

export default Cramer;
