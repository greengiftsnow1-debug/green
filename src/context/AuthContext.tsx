"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch session on load
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (session) {
        setUser(session.user);
        fetchProfile(session.user.id);
      }

      setLoading(false);
    };

    getSession();

    // Auth listener
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);

        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const fetchProfile = async (user_id: string) => {
    const { data } = await supabase
      .from("profile")
      .select("*")
      .eq("user_id", user_id)
      .single();

    setProfile(data || null);
  };

  const signup = async (email: string, password: string, name: string, mobile: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      await supabase.from("profile").insert({
        user_id: data.user.id,
        email,
        name,
        mobile,
      });
    }

    return data;
  };

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, profile, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
