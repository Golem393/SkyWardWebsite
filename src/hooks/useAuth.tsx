import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase, type Profile } from "@/lib/supabase";
import { usePostHog } from "@posthog/react";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  isLoading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const posthog = usePostHog();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadProfile = useCallback(async (user: User | null) => {
    if (!user) {
      setProfile(null);
      return;
    }
    const profileRes = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
    let p = (profileRes.data as Profile | null) ?? null;

    if (p && !p.terms_accepted_at && user.user_metadata?.terms_accepted_at) {
      const terms_accepted_at = user.user_metadata.terms_accepted_at;
      const terms_version = user.user_metadata.terms_version;
      const { data } = await supabase
        .from("profiles")
        .update({ terms_accepted_at, terms_version })
        .eq("id", user.id)
        .select()
        .maybeSingle();
      if (data) {
        p = data as Profile;
      }
    }

    setProfile(p);
  }, []);

  useEffect(() => {
    // Listen for auth changes.
    const {
      data: { subscription: authSub },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (event === "SIGNED_IN") {
        setIsLoading(true);
      }
      
      loadProfile(session?.user ?? null).finally(() => setIsLoading(false));

      if (event === "SIGNED_IN" && session?.user) {
        posthog.identify(session.user.id, { email: session.user.email });
      }
      if (event === "SIGNED_OUT") {
        posthog.reset();
      }
    });

    return () => authSub.unsubscribe();
  }, [loadProfile, posthog]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  const refreshProfile = useCallback(() => loadProfile(user), [loadProfile, user]);

  return (
    <AuthContext.Provider value={{ session, user, profile, isLoading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
