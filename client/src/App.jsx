import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Admin from "./pages/Admin.jsx"
import Shops from "./pages/Shops.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/shops" element={<Shops/>}></Route>
        <Route path="/admin" element={<Admin/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
