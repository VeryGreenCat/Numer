import React from "react";

function NewtonRaphsonTable({ data }) {
	return (
		<div className="overflow-x-auto mb-10 rounded-lg">
			<table className="min-w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th className="px-6 py-4 font-medium text-gray-900 dark:text-white">
							Iteration
						</th>
						<th className="px-6 py-4 font-medium text-gray-900 dark:text-white">
							X
						</th>
						<th className="px-6 py-4 font-medium text-gray-900 dark:text-white">
							Y
						</th>
						<th className="px-6 py-4 font-medium text-gray-900 dark:text-white">
							Error
						</th>
					</tr>
				</thead>
				<tbody>
					{data.map((element, index) => (
						<tr
							key={index}
							className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
						>
							<td className="text-sm px-6 py-4 whitespace-nowrap">
								{element.iteration}
							</td>
							<td className="text-sm px-6 py-4 whitespace-nowrap">
								{element.X}
							</td>
							<td className="text-sm px-6 py-4 whitespace-nowrap">
								{element.Y}
							</td>
							<td className="text-sm px-6 py-4 whitespace-nowrap">
								{element.error}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default NewtonRaphsonTable;
