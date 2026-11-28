import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalogue from './pages/Catalogue';
import Dashboard from './pages/Dashboard';
import Forbidden from './pages/Forbidden';
import Booking from './pages/booking';
import BookingDetail from './pages/BookingDetail';
import AppLayout from './AppLayout';
import { Navigate } from 'react-router-dom';
import RoleCheck from './components/rolecheck';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />          
        <Route path="/register" element={<Register />} />     

        <Route element={<AppLayout />}>                        
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/booking/:equipmentId" element={<Booking />} /> 
          <Route path="/dashboard" element={<RoleCheck allowedRoles={['staff', 'manager']}>
            <Dashboard />
          </RoleCheck>} />
          <Route path="/dashboard/bookings/:id" element={<RoleCheck allowedRoles={['staff', 'manager']}>
            <BookingDetail />
          </RoleCheck>} />
          <Route path="/forbidden" element={<Forbidden />} />
        </Route>                                               
      </Routes>
    </Router>
  );
}

export default App;
     
