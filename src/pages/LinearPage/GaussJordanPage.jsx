import React from "react";

import GaussJordan from "../../components/LinearAlgebra/GaussJordan";

function GaussJordanPage() {
	return (
		<div className="linearPage">
			<h1 className="header">Gauss Jordan</h1>
			<GaussJordan />
		</div>
	);
}

export default GaussJordanPage;
