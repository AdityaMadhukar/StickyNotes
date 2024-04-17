import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import Users from "./components/users/Users";
import Log from "./components/log/Log";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="bg-gray-800">
      <ToastContainer />
      <Navbar/>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="login" element={<Login />}/>
            <Route path="register" element={<Register />}/>
            <Route path="users" element={<Users />}/>
            <Route path="log" element={<Log />}/>
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
