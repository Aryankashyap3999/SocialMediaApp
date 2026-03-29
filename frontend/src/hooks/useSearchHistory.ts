import { useState, useCallback } from 'react';

export interface SearchHistoryItem {
  id: string;
  query: string;
  type: 'search' | 'user';
  timestamp: number;
  // populated for type === 'user'
  userId?: string;
  username?: string;
  name?: string;
  avatarUrl?: string;
}

const STORAGE_KEY = 'signal_search_history';
const MAX_ITEMS = 10;

function readStorage(): SearchHistoryItem[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export const useSearchHistory = () => {
  const [history, setHistory] = useState<SearchHistoryItem[]>(readStorage);

  const persist = useCallback((items: SearchHistoryItem[]) => {
    setHistory(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, []);

  const addSearch = useCallback((query: string) => {
    const q = query.trim();
    if (!q) return;
    const prev = readStorage();
    const deduped = prev.filter(h => !(h.type === 'search' && h.query === q));
    persist([
      { id: `s-${Date.now()}`, query: q, type: 'search', timestamp: Date.now() },
      ...deduped,
    ].slice(0, MAX_ITEMS));
  }, [persist]);

  const addUser = useCallback((user: {
    id: string; username: string; name?: string; avatarUrl?: string;
  }) => {
    const prev = readStorage();
    const deduped = prev.filter(h => !(h.type === 'user' && h.userId === user.id));
    persist([
      {
        id: `u-${Date.now()}`,
        query: user.username,
        type: 'user',
        timestamp: Date.now(),
        userId: user.id,
        username: user.username,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      ...deduped,
    ].slice(0, MAX_ITEMS));
  }, [persist]);

  const removeItem = useCallback((id: string) => {
    persist(readStorage().filter(h => h.id !== id));
  }, [persist]);

  const clearAll = useCallback(() => persist([]), [persist]);

  return { history, addSearch, addUser, removeItem, clearAll };
};
