import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const token = localStorage.getItem('authToken');
    return token ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;