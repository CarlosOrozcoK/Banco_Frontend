// routes.jsx
import { Navigate } from "react-router";
import HomePage from "./pages/Dashboards/HomePage";
import ContactList from "./components/contact/ContactList";
import HelpList from "./components/contact/HelpList";
import LoginPage from "./pages/Dashboards/LoginPage";
import RegisterPage from "./pages/Dashboards/RegisterPage";
import ProductsListT from "./components/contact/ProductsListT";
import CreditCardsView from "./components/contact/CreditCards";
import LoansView from "./components/contact/LoansView";
import InsuranceView from "./components/contact/InsuranceView";
import StocksView from "./components/contact/StocksView"; 

const routes = [
  { path: "/HomePage", element: <HomePage /> },
  { path: "/", element: <Navigate to={"/Homepage"} /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/Register", element: <RegisterPage /> },
  { path: "/ContactList", element: <ContactList /> },
  { path: "/HelpList", element: <HelpList /> },
  /*{ path: "/NProducts/:id", element: <ProductsListT /> },
  { path: "/products/credit-cards", element: <CreditCardsView /> },
  { path: "/products/loans", element: <LoansView /> },
  { path: "/products/insurance", element: <InsuranceView /> },
  { path: "/products/stocks", element: <StocksView /> }, 
   */
];

export default routes;