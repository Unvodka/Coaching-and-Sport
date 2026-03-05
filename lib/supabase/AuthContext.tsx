"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import type { User, Session } from "@supabase/supabase-js";
import type { Profile } from "@/lib/supabase/database.types";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  profile: null,
  isLoading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchProfile(
    supabase: ReturnType<typeof createClient>,
    userId: string
  ): Promise<Profile | null> {
    try {
      const res = await fetch("/api/portal/profile");
      if (res.ok) {
        const data = await res.json();
        return data.profile as Profile | null;
      }
    } catch {
      // fall through to direct query
    }
    try {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      return data as Profile | null;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    async function init() {
      try {
        // getSession() reads from localStorage — instant, no network call.
        // Resolves isLoading immediately so UI isn't blocked.
        const { data: { session: localSession } } = await supabase.auth.getSession();

        if (!mounted) return;

        if (localSession?.user) {
          // Show user immediately from local session
          setSession(localSession);
          setUser(localSession.user);
          setIsLoading(false); // unblock UI right away

          // Validate with server in background
          const { data: { user: validatedUser } } = await supabase.auth.getUser();
          if (!mounted) return;

          if (validatedUser) {
            setUser(validatedUser);
            const profileData = await fetchProfile(supabase, validatedUser.id);
            if (mounted) setProfile(profileData);
          } else {
            // Server rejected the session — clear everything
            setUser(null);
            setSession(null);
            setProfile(null);
            // isLoading already false — no need to set again
          }
        } else {
          // No local session — not logged in
          setUser(null);
          setSession(null);
          setProfile(null);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Auth init error:", error);
        if (mounted) setIsLoading(false);
      }
    }

    // Safety net: if init() hangs for any reason, unblock after 3s
    const safetyTimer = setTimeout(() => {
      if (mounted) setIsLoading(false);
    }, 3000);

    init().finally(() => clearTimeout(safetyTimer));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event: string, newSession: Session | null) => {
        if (!mounted) return;
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setIsLoading(false);

        if (newSession?.user) {
          const profileData = await fetchProfile(supabase, newSession.user.id);
          if (mounted) setProfile(profileData);
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      mounted = false;
      clearTimeout(safetyTimer);
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/portal`,
      },
    });
  };

  const signOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Sign out error:", err);
    }
    setUser(null);
    setSession(null);
    setProfile(null);
    window.location.href = "/";
  };

  const refreshProfile = async () => {
    if (!user?.id) return;
    const supabase = createClient();
    const profileData = await fetchProfile(supabase, user.id);
    if (profileData) setProfile(profileData);
  };

  return (
    <AuthContext.Provider
      value={{ user, session, profile, isLoading, signInWithGoogle, signOut, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
