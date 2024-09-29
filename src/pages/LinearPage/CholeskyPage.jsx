import React from "react";

import Cholesky from "../../components/LinearAlgebra/Cholesky";

function CholeskyPage() {
	return (
		<div className="linearPage">
			<h1 className="header">Cholesky Decomposition</h1>
			<Cholesky />
		</div>
	);
}

export default CholeskyPage;
