import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function History() {
	const [isSidebarVisible, setIsSidebarVisible] = useState(false);
	const [data, setData] = useState([]);
	const sidebarRef = useRef(null); // Reference to the sidebar

	// Toggle sidebar visibility
	const toggleSidebar = () => {
		setIsSidebarVisible(!isSidebarVisible);
	};

	// Hide sidebar when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
				setIsSidebarVisible(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);

		fetchData();

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/load/rootequation/all/100`
			);
			setData(response.data.equations);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	return (
		<>
			{/* Button to toggle the sidebar */}
			<button
				className="z-10 fixed top-5 right-5 w-min cursor-pointer transition-all bg-blue-600 text-white px-2 py-2 rounded-lg border-blue-700 border-b-[4px] hover:brightness-110 hover:translate-y-[-2px] active:translate-y-[2px] active:brightness-90"
				type="button"
				onClick={toggleSidebar}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
					/>
				</svg>
			</button>

			{/* Sidebar */}
			<div
				ref={sidebarRef}
				className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
					isSidebarVisible ? "translate-x-0" : "translate-x-full"
				}`}
				tabIndex="-1"
				aria-labelledby="drawer-right-label"
			>
				<div className="overflow-x-auto rounded-lg">
					<table className="min-w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-950 dark:text-gray-400">
							<tr>
								<th className="px-6 py-2 font-medium text-gray-900 dark:text-white">
									Equation History
								</th>
							</tr>
						</thead>
						<tbody>
							{data.map((value, index) => (
								<tr
									key={index}
									className="bg-white border-b dark:bg-gray-900  dark:border-gray-700"
								>
									<td className="text-sm px-6 py-2 whitespace-nowrap">
										{value.equation}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default History;
