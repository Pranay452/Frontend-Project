import Cookies from "js-cookie";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  authToken?: string;
  setAuthToken: Dispatch<SetStateAction<string | undefined>>;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  authToken: undefined,
  setAuthToken: () => {},
  isAuthenticated: false,
});

const AuthProvider = (props: { children: ReactNode }) => {
  const { children } = props || {};
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    setAuthToken(accessToken);
  }, []);

  const isAuthenticated = authToken && authToken?.length > 0 ? true : false;

  const data = {
    authToken,
    setAuthToken,
    isAuthenticated,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
