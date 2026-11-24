import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalogue from './pages/Catalogue';
import Dashboard from './pages/Dashboard';
import AppLayout from './AppLayout';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />          
        <Route path="/register" element={<Register />} />     

        <Route element={<AppLayout />}>                        
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>                                               
      </Routes>
    </Router>
  );
}

export default App;
     
