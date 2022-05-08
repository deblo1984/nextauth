import React, { createContext, useContext, useState, useEffect } from "react";
import { Router, useRouter } from "next/router";
import api from "../services/api";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loginWithToken();
  }, []);

  async function loginWithToken() {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: user } = await api.get(
        "http://localhost:5000/api/users/me"
      );
      setUser(user);
    }
    setIsLoading(false);
  }
  const login = async (email, password) => {
    /* const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    }; */
    //console.log(email);
    const { data: token } = await api.post(
      "http://localhost:5000/api/users/login",
      {
        email,
        password,
      }
    );
    console.log(token.user);
    if (token.user) {
      localStorage.setItem("token", token.token);
      setUser(token.user);
      router.push("/");
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("token");
    delete api.defaults.headers.Authorization;
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
        loginWithToken,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
