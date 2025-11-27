import {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { AuthContextValue, AuthState } from "types/tui.type";
import { fetchUserAuth, fetchUserData, fetchUserTokens } from "../actions/user";

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  const tokenRef = useRef<string | null>(null);

  const getToken = useCallback(async (): Promise<string | null> => {
    if (tokenRef.current) return tokenRef.current;
    const tokens = await fetchUserTokens();
    tokenRef.current = tokens?.access_token ?? null;
    return tokenRef.current;
  }, []);

  const fetchUser = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const isAuth = await fetchUserAuth();
      if (!isAuth) {
        setState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          error: null,
        });
        return;
      }

      const userData = await fetchUserData();
      setState({
        user: userData,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
    } catch (err) {
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: err instanceof Error ? err.message : "Failed to fetch user",
      });
    }
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: fetch user on mount only
  useEffect(() => {
    fetchUser();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      getToken,
      refresh: fetchUser,
    }),
    [state, getToken, fetchUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
