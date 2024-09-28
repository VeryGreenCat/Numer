import React from "react";

import NewtonRaphson from "../../components/RootOfEquation/NewtonRaphson";

function NewtonRaphsonPage() {
	return (
		<>
			<div className="rootPage">
				<h1 className="header">Newton Raphson</h1>
				<NewtonRaphson />
			</div>
		</>
	);
}

export default NewtonRaphsonPage;
