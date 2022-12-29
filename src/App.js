import { Routes, Route } from "react-router-dom"
import Register from "./components/Register/Register"
import Login from "./components/Login/Login"
import Main from "./components/Main/Main"
import Profile from "./components/Profile/Profile"
import './App.css';




function App() {


  return (
    <>
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>

    </>
    
  );
}

export default App;

