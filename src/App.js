import Nav from "./Nav/Nav";
import { Routes, Route } from "react-router-dom"
import Register from "./Register/Register"
import Login from "./Login/Login"
import Timeline from "./Timeline/Timeline"
import './App.css';
import Profile from "./Profile/Profile";



function App() {


  return (
    <>
    <div>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>

    </>
    
  );
}

export default App;

