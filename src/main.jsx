import { StrictMode } from 'react' 
import { createRoot } from 'react-dom/client'
import { BrowserRouter , Routes, Route } from 'react-router-dom'

//import pages
import RootPage from "./pages/RootPage.jsx";
import LinearPage from './pages/LinearPage.jsx'

//import component
import MainContent from './pages/MainContent.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route index element={<MainContent />} />
      <Route path="/RootPage" element={<RootPage />} />
      <Route path="/LinearPage" element={<LinearPage />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
