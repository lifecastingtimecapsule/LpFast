import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";

export type ProfileRole = "customer" | "staff" | "admin";

export interface Profile {
  id: string;
  role: ProfileRole;
  customer_id: string | null;
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
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, role, customer_id")
        .eq("id", session.user.id)
        .maybeSingle();
      if (cancelled) return;
      if (error) {
        setProfile(null);
      } else {
        setProfile(data as Profile | null);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [session?.user?.id]);

  const isStaffOrAdmin =
    profile?.role === "staff" || profile?.role === "admin";

  return { profile, loading, isStaffOrAdmin, role: profile?.role ?? null };
}
