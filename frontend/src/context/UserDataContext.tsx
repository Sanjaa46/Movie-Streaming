import { createContext, useContext, useCallback, type ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { SMALL_CARDS, type MovieCard } from "../data/mockData";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface ContinueEntry {
    movie: MovieCard;
    secondsWatched: number;
    durationSeconds: number;
}

interface UserDataContextType {
    getContinue: () => ContinueEntry | null;
    setContinue: (entry: ContinueEntry) => void;
    getBookmarked: () => MovieCard[];
    addBookmark: (movie: MovieCard) => void;
    removeBookmark: (movieId: number) => void;
    isBookmarked: (movieId: number) => boolean;
    getWatched: () => MovieCard[];
    addWatched: (movie: MovieCard) => void;
    removeWatched: (movieId: number) => void;
}

const UserDataContext = createContext<UserDataContextType | null>(null);

// ---------------------------------------------------------------------------
// localStorage helpers
// ---------------------------------------------------------------------------
function storageKey(type: string, userId: string) {
    return `${type}_${userId}`;
}

function loadJSON<T>(key: string, fallback: T): T {
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
        return fallback;
    }
}

function saveJSON<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
}

// ---------------------------------------------------------------------------
// Seed helpers – pre-populate data so pages aren't empty on first load
// ---------------------------------------------------------------------------
function seedIfEmpty(key: string, data: unknown) {
    if (!localStorage.getItem(key)) {
        saveJSON(key, data);
    }
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
export function UserDataProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();

    // Seed demo data once per user on first encounter
    if (user) {
        seedIfEmpty(storageKey("continue", user.id), {
            movie: SMALL_CARDS[0],
            secondsWatched: 1450,
            durationSeconds: 5400,
        } satisfies ContinueEntry);

        seedIfEmpty(
            storageKey("bookmarked", user.id),
            [SMALL_CARDS[1], SMALL_CARDS[2], SMALL_CARDS[3]]
        );

        seedIfEmpty(
            storageKey("watched", user.id),
            [SMALL_CARDS[4], SMALL_CARDS[5], SMALL_CARDS[6]]
        );
    }

    // ---- Continue watching ----
    const getContinue = useCallback((): ContinueEntry | null => {
        if (!user) return null;
        return loadJSON<ContinueEntry | null>(storageKey("continue", user.id), null);
    }, [user]);

    const setContinue = useCallback((entry: ContinueEntry) => {
        if (!user) return;
        saveJSON(storageKey("continue", user.id), entry);
    }, [user]);

    // ---- Bookmarked ----
    const getBookmarked = useCallback((): MovieCard[] => {
        if (!user) return [];
        return loadJSON<MovieCard[]>(storageKey("bookmarked", user.id), []);
    }, [user]);

    const addBookmark = useCallback((movie: MovieCard) => {
        if (!user) return;
        const key = storageKey("bookmarked", user.id);
        const current = loadJSON<MovieCard[]>(key, []);
        if (!current.find((m) => m.id === movie.id)) {
            saveJSON(key, [...current, movie]);
        }
    }, [user]);

    const removeBookmark = useCallback((movieId: number) => {
        if (!user) return;
        const key = storageKey("bookmarked", user.id);
        const current = loadJSON<MovieCard[]>(key, []);
        saveJSON(key, current.filter((m) => m.id !== movieId));
    }, [user]);

    const isBookmarked = useCallback((movieId: number): boolean => {
        if (!user) return false;
        const current = loadJSON<MovieCard[]>(storageKey("bookmarked", user.id), []);
        return current.some((m) => m.id === movieId);
    }, [user]);

    // ---- Watched ----
    const getWatched = useCallback((): MovieCard[] => {
        if (!user) return [];
        return loadJSON<MovieCard[]>(storageKey("watched", user.id), []);
    }, [user]);

    const addWatched = useCallback((movie: MovieCard) => {
        if (!user) return;
        const key = storageKey("watched", user.id);
        const current = loadJSON<MovieCard[]>(key, []);
        if (!current.find((m) => m.id === movie.id)) {
            saveJSON(key, [...current, movie]);
        }
    }, [user]);

    const removeWatched = useCallback((movieId: number) => {
        if (!user) return;
        const key = storageKey("watched", user.id);
        const current = loadJSON<MovieCard[]>(key, []);
        saveJSON(key, current.filter((m) => m.id !== movieId));
    }, [user]);

    return (
        <UserDataContext.Provider
            value={{
                getContinue,
                setContinue,
                getBookmarked,
                addBookmark,
                removeBookmark,
                isBookmarked,
                getWatched,
                addWatched,
                removeWatched,
            }}
        >
            {children}
        </UserDataContext.Provider>
    );
}

export function useUserData() {
    const ctx = useContext(UserDataContext);
    if (!ctx) throw new Error("useUserData must be used inside <UserDataProvider>");
    return ctx;
}
