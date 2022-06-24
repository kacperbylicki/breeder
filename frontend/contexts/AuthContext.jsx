import Cookies from "js-cookie";
import Loading from "../components/Loading";
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
    (async () => {
      const accessToken = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");
      const persistedProfile = Cookies.get("profile");

      if (!isAuthenticated) {
        setIsLoading(false);
      }

      if (persistedProfile) {
        setProfile(JSON.parse(persistedProfile));
        setAuthenticated(true);
        setIsLoading(false);
      }

      if (accessToken && refreshToken && !persistedProfile) {
        const headers = getHeaders(accessToken);

        try {
          const {
            data: { data: account },
          } = await axios.get("http://localhost:3002/accounts/me", headers);

          if (account) {
            setProfile(account?.profile);
            setAuthenticated(true);
            setIsLoading(false);
          }
        } catch (error) {
          setError(error?.response?.data);
          setTimeout(() => {
            setError();
          }, 3000);
        }
      }
    })();
  }, [isAuthenticated, isLoading, error]);

  const login = async ({ email, password }) => {
    try {
      const {
        data: {
          data: { tokens, account },
        },
      } = await axios.post("http://localhost:3002/accounts/login", { email, password }); // refactor to service

      if (!account?.profile) {
        setAuthenticated(true);
        setProfile();
        setIsLoading(false);

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
    } catch (error) {
      setError(error?.response?.data);
      setTimeout(() => {
        setError();
      }, 3000);
    }
  };

  const logout = async () => {
    const accessToken = Cookies.get("accessToken");

    const revokeAccesses = () => {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("profile");

      setProfile();
      setAuthenticated(false);
      setIsLoading(false);

      router.push("/login");
    };

    const headers = getHeaders(accessToken);

    try {
      await axios.post("http://localhost:3002/accounts/logout", {}, headers);
      revokeAccesses();
    } catch (error) {
      revokeAccesses();
    }
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

  const isProtected = protectedRoutes.includes(router.pathname);

  useEffect(() => {
    if (!isAuthenticated && isProtected) {
      router.push("/login");
    }

    if (isAuthenticated && !profile) {
      router.push("/setup");
    }

    if (isAuthenticated && !isProtected) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, isProtected]);

  if (isLoading || (!isAuthenticated && isProtected)) {
    return <Loading />;
  }

  return children;
};

export const useAuth = () => useContext(AuthContext);
