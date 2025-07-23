import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export const Navbar = ({ onLoginClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const checkUserStatus = () => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const userData = JSON.parse(user);
        setIsLoggedIn(true);
        setUserName(userData.name || userData.username || "Usuario");

        // Actualizar la lógica para detectar admin con ADMINB
        const isAdminUser =
          userData.role === "ADMIN_ROLE" ||
          userData.email?.includes("ADMIN_ROLE") ||
          userData.isAdmin ||
          userData.username === "ADMINB" ||
          userData.username?.toLowerCase().includes("admin");

        setIsAdmin(isAdminUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setIsLoggedIn(false);
        setIsAdmin(false);
        setUserName("");
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
      setUserName("");
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  // Escuchar cambios en el estado del usuario
  useEffect(() => {
    const handleUserStatusChange = () => {
      checkUserStatus();
    };

    window.addEventListener("userStatusChange", handleUserStatusChange);
    window.addEventListener("storage", handleUserStatusChange);

    return () => {
      window.removeEventListener("userStatusChange", handleUserStatusChange);
      window.removeEventListener("storage", handleUserStatusChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserName("");
    // Disparar evento de cambio de estado
    window.dispatchEvent(new Event("userStatusChange"));
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-blue-800 to-blue-600 shadow-lg z-40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/HomePage")}
        >
          <div className="bg-white p-2 rounded-lg">
    <img
      src="./src/assets/Logo Banco Nacional de Guatemala.png"
      alt="Logo Banco de Guatemala"
      className="h-8 w-8 object-contain"
    />
  </div>
          <h1 className="text-2xl font-bold text-white">Banco de Guatemala</h1>
        </div>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <div className="flex items-center space-x-3">
                <UserIcon className="h-5 w-5 text-white" />
                <span className="text-white font-medium">{userName}</span>
                {isAdmin && (
                  <span className="bg-yellow-500 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                    ADMIN
                  </span>
                )}
              </div>

              {isAdmin && (
                <button
                  className="bg-yellow-500 text-yellow-900 hover:bg-yellow-400 font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                  onClick={() => navigate("/admin")}
                >
                  <CogIcon className="h-4 w-4" />
                  <span>Panel Admin</span>
                </button>
              )}

              <button
                className="bg-red-600 text-white hover:bg-red-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                onClick={handleLogout}
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                <span>Salir</span>
              </button>
            </>
          ) : (
            <button
              className="bg-white text-blue-800 hover:bg-blue-100 font-medium py-2 px-6 rounded-lg transition-colors"
              onClick={onLoginClick || (() => navigate("/login"))}
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
