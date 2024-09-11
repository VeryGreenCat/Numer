import { StrictMode } from 'react' 
import { createRoot } from 'react-dom/client'
import { BrowserRouter , Routes, Route } from 'react-router-dom'

//import pages
import BisectionPage from "./pages/BisectionPage.jsx";

//import component
import MainContent from './pages/MainContent.jsx'

//import css
import "./Css/global.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route index element={<MainContent />} />
      <Route path="/BisectionPage" element={<BisectionPage />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
