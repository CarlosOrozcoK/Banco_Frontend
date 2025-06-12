import { Navigate } from "react-router";
import HomePage from "./pages/Dashboards/HomePage";
import ContactList from "./components/contact/ContactList"
import HelpList from "./components/contact/HelpList"
import LoginPage from "./pages/Dashboards/LoginPage"
import RegisterPage from "./pages/Dashboards/RegisterPage"


const routes = [
    {path: "/HomePage", element: <HomePage />},
    {path: "/", element: <Navigate to={"/Homepage"}/>},
    {path: "/ContactList", element: <ContactList />},
    {path: "/HelpList", element: <HelpList />},
    {path: "/login", element: <LoginPage />},
    {path: "/Register", element: <RegisterPage />},

]

export default routes
