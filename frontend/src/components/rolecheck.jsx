import {useAuth} from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const RoleCheck = ({ allowedRoles, children }) => {
    const { user } = useAuth();
   
    if (!user) {
        return <Navigate to="/login" />;
    };

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/forbidden" />;
    };

    return children;
};

export default RoleCheck;



