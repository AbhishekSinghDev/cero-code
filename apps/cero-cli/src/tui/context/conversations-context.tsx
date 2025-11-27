import {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ConversationsContextValue, ConversationsState } from "types/tui.type";
import { fetchConversationsList } from "../actions/conversations";
import { useAuth } from "../hooks/use-auth";

export const ConversationsContext = createContext<ConversationsContextValue | null>(null);

interface ConversationsProviderProps {
  children: ReactNode;
}

export function ConversationsProvider({ children }: ConversationsProviderProps) {
  const { isAuthenticated, getToken } = useAuth();

  const [state, setState] = useState<ConversationsState>({
    conversations: [],
    isLoading: false,
    error: null,
  });

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      setState({ conversations: [], isLoading: false, error: null });
      return;
    }

    const token = await getToken();
    if (!token) {
      setState((prev) => ({
        ...prev,
        error: "No auth token available",
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const response = await fetchConversationsList(token);
      setState({
        conversations: response.conversations,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      setState({
        conversations: [],
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to fetch conversations",
      });
    }
  }, [getToken, isAuthenticated]);

  const getConversation = useCallback(
    (id: string) => {
      return state.conversations.find((c) => c.id === id);
    },
    [state.conversations]
  );

  // Fetch conversations on auth change
  useEffect(() => {
    if (isAuthenticated) {
      refresh();
    }
  }, [isAuthenticated, refresh]);

  const value = useMemo<ConversationsContextValue>(
    () => ({
      conversations: state.conversations,
      isLoading: state.isLoading,
      error: state.error,
      refresh,
      getConversation,
    }),
    [state, refresh, getConversation]
  );

  return (
    <ConversationsContext.Provider value={value}>{children}</ConversationsContext.Provider>
  );
}
