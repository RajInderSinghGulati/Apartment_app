import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import './App.css';
import UserDashboard from './Components/UserDashboard';

function App() {
  return (
    <Routes>
      <Route path='/' element={<UserDashboard />} />
    </Routes>
  );
}

export default App;
