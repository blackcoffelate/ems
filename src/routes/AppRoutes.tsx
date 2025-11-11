import { Route, Routes } from "react-router-dom";

import { MainLayout } from "../components/layout/MainLayout"; // Pastikan impor ini benar
import AuthPage from "../pages/AuthPage";
import { HomePage } from "../pages/HomePages";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/auth" element={<AuthPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route
                    path="/"
                    element={<MainLayout><HomePage /></MainLayout>}
                />
            </Route>
        </Routes>
    );
};