import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../pages/LoginPage"
import { HomePage } from "../pages/HomePage"
import { RegisterPage } from "../pages/RegisterPage"
import { KatasPage } from "../pages/KatasPage"
import { KatasDetailPage } from "../pages/KatasDetailPage"


export const AppRoutes = () => {
    return (
        <Routes>
        {/* Routes definition */}
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/katas" element={<KatasPage />}></Route>
        <Route path="/katas/:id" element={<KatasDetailPage />}></Route>
        {/* Redirect to when Page Not Found */}
        <Route 
          path="*"
          element={<Navigate to="/" replace/>}>  
        </Route>
      </Routes>
    )
}