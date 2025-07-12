// routes.jsx
import { Navigate } from "react-router-dom";
import HomePage from "./pages/Dashboards/HomePage";
import ContactList from "./components/contact/ContactList";
import HelpList from "./components/contact/HelpList";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProductsListT from "./components/contact/ProductsListT";
import CreditCardsView from "./components/contact/CreditCards";
import LoansView from "./components/contact/LoansView";
import InsuranceView from "./components/contact/InsuranceView";
import StocksView from "./components/contact/StocksView";
import TransferPage from "./pages/Transacions/Transfer";
import CreditCardRequestPage from "./pages/creditCard/CreditCardRequestPage";
import AccountBalancePage from "./pages/BalanceAccount/AccountBalancePage";
import PlanSelectorPage from "./pages/LifeInsurance/LifeInsurance";
import BrokerPage from "./pages/broker/BrokerPage";
import WelcomePage from "./pages/auth/WelcomePage";
import AdminPanel from "./pages/admin/AdminPanel";

function RequireAuth({ children }) {
  const isAuthenticated = !!localStorage.getItem("user");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function RequireAdmin({ children }) {
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    return <Navigate to="/login" replace />;
  }
  
  try {
    const user = JSON.parse(userStr);
    const isAdmin = user?.isAdmin || 
                   user?.role === 'admin' || 
                   user?.email?.includes('admin') ||
                   user?.username === 'ADMINB' ||
                   user?.username?.toLowerCase().includes('admin');
    
    if (!isAdmin) {
      return <Navigate to="/HomePage" replace />;
    }
    
    return children;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
}

const routes = [
  {
    path: "/HomePage",
    element: (
      <RequireAuth>
        <HomePage />
      </RequireAuth>
    ),
  },
  {
    path: "/admin",
    element: (
      <RequireAdmin>
        <AdminPanel />
      </RequireAdmin>
    ),
  },
  { path: "/", element: <Navigate to={"/login"} /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/Register", element: <RegisterPage /> },
  { path: "/ContactList", element: <ContactList /> },
  { path: "/HelpList", element: <HelpList /> },
  { path: "/NProducts/:id", element: <ProductsListT /> },
  { path: "/products/loans", element: <LoansView /> },
  { path: "/products/insurance", element: <InsuranceView /> },
  { path: "/products/stocks", element: <StocksView /> },
  { path: "/products/transfer", element: <TransferPage /> },
  { path: "/credit-card/request", element: <CreditCardRequestPage /> },
  { path: "/account/Balance", element: <AccountBalancePage /> },
  { path: "/plan-selector", element: <PlanSelectorPage /> },
  { path: "/broker", element: <BrokerPage /> },
  { path: "/welcome", element: <WelcomePage /> },
];

export default routes;
