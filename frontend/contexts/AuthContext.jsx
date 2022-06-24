import Cookies from "js-cookie";
import Loading from "../components/Loading";
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../utils/api/get-current-user";
import { loginAccount } from "../utils/api/login";
import { logoutAccount } from "../utils/api/logout";
import { useRouter } from "next/router";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState();
  const [error, setError] = useState();
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const persistedAccessToken = Cookies.get("accessToken");
      const persistedRefreshToken = Cookies.get("refreshToken");

      if (!isAuthenticated) {
        setIsLoading(false);
      }

      if (persistedAccessToken && persistedRefreshToken) {
        setAccessToken(persistedAccessToken);
        setRefreshToken(persistedRefreshToken);
      }

      if (accessToken && refreshToken && !profile) {
        const { account, error: fetchError } = await getCurrentUser(accessToken);

        if (fetchError) {
          setError(fetchError);
          setTimeout(() => {
            setError();
          }, 3000);
        }

        setProfile(account?.profile);
        setAuthenticated(true);
        setIsLoading(false);
      }
    })();
  }, [isAuthenticated, isLoading, error, accessToken, refreshToken]);

  const login = async ({ email, password }) => {
    const { account, tokens, error: fetchError } = await loginAccount({ email, password });

    if (fetchError) {
      setError(fetchError);
      setTimeout(() => {
        setError();
      }, 3000);
    }

    if (!account?.profile) {
      Cookies.set("accessToken", tokens.accessToken);
      Cookies.set("refreshToken", tokens.refreshToken);

      setAuthenticated(true);
      setAccessToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);
      setProfile();
      setIsLoading(false);

      router.push("/setup");
    }

    Cookies.set("accessToken", tokens.accessToken);
    Cookies.set("refreshToken", tokens.refreshToken);
    Cookies.set("profile", JSON.stringify(account.profile));

    setAuthenticated(true);
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);
    setProfile(account.profile);
    setIsLoading(false);

    router.push("/");
  };

  const logout = async () => {
    const { error: fetchError } = await logoutAccount(accessToken);

    if (fetchError) {
      setError(fetchError);
      setTimeout(() => {
        setError();
      }, 3000);
    }

    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("profile");

    setProfile();
    setAccessToken();
    setRefreshToken();
    setAuthenticated(false);
    setIsLoading(false);

    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        profile,
        accessToken,
        refreshToken,
        error,
        login,
        logout,
        setProfile,
        setError,
      }}
    >
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
