import Cookies from "js-cookie";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getUserProfile = async () => {
      const accessToken = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");
      const persistedProfile = Cookies.get("profile");

      if (persistedProfile) {
        setProfile(JSON.parse(persistedProfile));
        setAuthenticated(true);
      }

      if (accessToken && refreshToken && !persistedProfile) {
        const headers = getHeaders(accessToken);
        const {
          data: { data: account },
        } = await axios.get("http://localhost:3002/accounts/me", headers);

        if (account) {
          setProfile(account?.profile);
          setAuthenticated(true);
        }
      }
    };
    getUserProfile();
  }, [isAuthenticated]);

  const login = async ({ email, password }) => {
    const {
      data: {
        data: { tokens, account },
      },
    } = await axios.post("http://localhost:3002/accounts/login", { email, password }); // refactor to service

    if (!account?.profile) {
      setAuthenticated(true);
      setProfile(null);

      router.push("/setup");
    }

    if (tokens && account.profile) {
      Cookies.set("accessToken", tokens?.accessToken);
      Cookies.set("refreshToken", tokens?.refreshToken);
      Cookies.set("profile", JSON.stringify(account.profile));

      setAuthenticated(true);
      setProfile(account.profile);
      setIsLoading(false);

      router.push("/");
    }
  };

  const logout = async () => {
    const accessToken = Cookies.get("accessToken");

    const headers = getHeaders(accessToken);
    await axios.post("http://localhost:3002/accounts/logout", headers);

    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("profile");

    setProfile(null);

    router.push("/login");
  };

  const getHeaders = (accessToken) => ({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, profile, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const ProtectedRoute = ({ protectedRoutes, children }) => {
  const router = useRouter();
  const { isAuthenticated, isLoading, profile } = useAuth();

  const isProtected = !protectedRoutes.includes(router.pathname);

  useEffect(() => {
    if (!isAuthenticated && isProtected) {
      router.push("/login");
    }

    if (isAuthenticated && !profile) {
      router.push("/setup");
    }
  }, [isAuthenticated, isLoading, isProtected]);

  if ((isLoading || !isAuthenticated) && isProtected) {
    return <div>loading...</div>;
  }

  return children;
};

export const useAuth = () => useContext(AuthContext);
