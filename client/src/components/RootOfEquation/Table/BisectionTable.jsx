import React from "react";

function BisectionTable({ data }) {
	return (
		<div className="pt-4 overflow-x-auto mb-10 rounded-lg">
			<table className="min-w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th className="px-6 py-4 font-medium text-gray-900 dark:text-white">
							Iteration
						</th>
						<th className="px-6 py-4 font-medium text-gray-900 dark:text-white">
							XL
						</th>
						<th className="px-6 py-4 font-medium text-gray-900 dark:text-white">
							XM
						</th>
						<th className="px-6 py-4 font-medium text-gray-900 dark:text-white">
							XR
						</th>
						<th className="px-6 py-4 font-medium text-gray-900 dark:text-white">
							Error (%)
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
								{element.Xl}
							</td>
							<td className="text-sm px-6 py-4 whitespace-nowrap">
								{element.Xm}
							</td>
							<td className="text-sm px-6 py-4 whitespace-nowrap">
								{element.Xr}
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

export default BisectionTable;
