import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import Root of Equation pages
import GraphicalPage from "./pages/RootPage/GraphicalPage.jsx";
import BisectionPage from "./pages/RootPage/BisectionPage.jsx";
import FalsePositionPage from "./pages/RootPage/FalsePositionPage.jsx";
import OnePointPage from "./pages/RootPage/OnePointPage.jsx";
import NewtonRaphsonPage from "./pages/RootPage/NewtonRaphsonPage.jsx";
import SecantPage from "./pages/RootPage/SecantPage.jsx";

//import Linear Algebra pages
import CramerPage from "./pages/LinearPage/CramerPage.jsx";
import GaussPage from "./pages/LinearPage/GaussPage.jsx";
import GaussJordanPage from "./pages/LinearPage/GaussJordanPage.jsx";
import MatrixInversionPage from "./pages/LinearPage/MatrixInversionPage.jsx";
import LUPage from "./pages/LinearPage/LUPage.jsx";
import CholeskyPage from "./pages/LinearPage/CholeskyPage.jsx";
import ConjugateGradientPage from "./pages/LinearPage/ConjugateGradientPage.jsx";

//import component
import MainContent from "./pages/MainContent.jsx";

//import css
import "./Css/global.css";

document.documentElement.classList.add("dark"); //force dark mode

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route index element={<MainContent />} />
				<Route path="/GraphicalPage" element={<GraphicalPage />} />
				<Route path="/BisectionPage" element={<BisectionPage />} />
				<Route path="/FalsePositionPage" element={<FalsePositionPage />} />
				<Route path="/OnePointPage" element={<OnePointPage />} />
				<Route path="/NewtonRaphsonPage" element={<NewtonRaphsonPage />} />
				<Route path="/SecantPage" element={<SecantPage />} />

				<Route path="/CramerPage" element={<CramerPage />} />
				<Route path="/GaussPage" element={<GaussPage />} />
				<Route path="/GaussJordanPage" element={<GaussJordanPage />} />
				<Route path="/MatrixInversionPage" element={<MatrixInversionPage />} />
				<Route path="/LUPage" element={<LUPage />} />
				<Route path="/CholeskyPage" element={<CholeskyPage />} />
				<Route
					path="/ConjugateGradientPage"
					element={<ConjugateGradientPage />}
				/>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
