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

  // Fetch profile: API route first (reliable auth), fallback to direct query
  async function fetchProfile(supabase: ReturnType<typeof createClient>, userId: string): Promise<Profile | null> {
    try {
      const res = await fetch("/api/portal/profile");
      if (res.ok) {
        const data = await res.json();
        return data.profile as Profile | null;
      }
    } catch {
      // API failed, try direct query
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
        const { data: { user: authUser } } = await supabase.auth.getUser();

        if (!mounted) return;
        setUser(authUser);

        if (authUser) {
          const { data: { session: authSession } } = await supabase.auth.getSession();
          if (mounted) setSession(authSession);

          const profileData = await fetchProfile(supabase, authUser.id);
          if (mounted) setProfile(profileData);
        } else {
          setSession(null);
          setProfile(null);
        }
      } catch (error) {
        console.error("Auth init error:", error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    init();

    const safetyTimer = setTimeout(() => {
      if (mounted) setIsLoading(false);
    }, 4000);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event: string, newSession: Session | null) => {
      if (!mounted) return;
      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (newSession?.user) {
        const profileData = await fetchProfile(supabase, newSession.user.id);
        if (mounted) setProfile(profileData);
      } else {
        setProfile(null);
      }

      setIsLoading(false);
    });

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
    const supabase = createClient();
    const profileData = await fetchProfile(supabase, user?.id || "");
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
