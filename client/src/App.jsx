import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Shops from "./pages/Shops.jsx"
import Login from "./pages/Login.jsx"
import AuthProvider from "./components/AuthContext.jsx"
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/shops/:id" element={<Shops/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
