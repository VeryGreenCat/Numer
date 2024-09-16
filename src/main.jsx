import { StrictMode } from 'react' 
import { createRoot } from 'react-dom/client'
import { BrowserRouter , Routes, Route } from 'react-router-dom'

//import pages
import GraphicalPage from "./pages/GraphicalPage.jsx";
import BisectionPage from "./pages/BisectionPage.jsx";
import FalsePositionPage from "./pages/FalsePositionPage.jsx";
import OnePointPage from "./pages/OnePointPage.jsx";
import NewtonRaphsonPage from "./pages/NewtonRaphsonPage.jsx";
import SecantPage from "./pages/SecantPage.jsx";

//import component
import MainContent from './pages/MainContent.jsx'

//import css
import "./Css/global.css";

createRoot(document.getElementById('root')).render(
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
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
