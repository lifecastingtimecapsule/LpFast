import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";

export type ProfileRole = "customer" | "staff" | "admin";

export interface Profile {
  id: string;
  role: ProfileRole;
  active_flag: boolean;
}

export function useProfile(session: { user: { id: string } } | null) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase || !session?.user?.id) {
      setProfile(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("app_users")
        .select("user_id, role, active_flag")
        .eq("user_id", session.user.id)
        .maybeSingle();
      if (cancelled) return;
      if (error || !data) {
        setProfile(null);
      } else {
        setProfile({ id: data.user_id, role: data.role as ProfileRole, active_flag: data.active_flag });
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [session?.user?.id]);

  const isStaffOrAdmin =
    (profile?.role === "staff" || profile?.role === "admin") &&
    profile?.active_flag === true;

  return { profile, loading, isStaffOrAdmin, role: profile?.role ?? null };
}
