
import './App.css'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import PasswordManager from './components/PasswordManager';
import Login from './components/Login';
import Register from './components/Register';
import Master from './components/Master';

function App() {

  return (
    <div className="bg-dark">

    <Router>
      <Routes>
        <Route path="/" element={<PasswordManager/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/masterlogin" element={<Master/>}/>
      </Routes>
    </Router>
    </div>

  )
}

export default App
