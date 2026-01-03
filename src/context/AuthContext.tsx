"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Listen for login/logout
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const activeUser = session?.user || null;
        setUser(activeUser);

        if (activeUser) {
          await fetchProfile(activeUser.id);
        } else {
          setProfile(null);
        }
      }
    );

    supabase.auth.getSession().then(async ({ data }) => {
      const activeUser = data.session?.user || null;
      setUser(activeUser);

      if (activeUser) await fetchProfile(activeUser.id);

      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // 🔍 Fetch user profile safely
  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();     // ← FIX: prevents PGRST116

    if (error) {
      console.error("Profile fetch error:", error);
      return;
    }

    setProfile(data);
  };

  // 🆕 SIGNUP
  const signup = async (
    email: string,
    password: string,
    name: string,
    mobile: string
  ) => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) throw error;

    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        email,
        name,
        mobile,
      });

      await fetchProfile(data.user.id);
    }

    return data.user;
  };

  // 🔐 LOGIN
  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) await fetchProfile(data.user.id);

    return data.user;
  };

  // 🚪 LOGOUT (Fully working)
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);

    window.location.href = "/login"; // ← BEST way in Next.js
  };
  const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw error;
};


  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signup,
        login,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
