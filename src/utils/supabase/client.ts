import { createClient } from "@supabase/supabase-js";
import { supabaseProjectId, supabaseAnonKey } from "./info";

export const supabase =
  supabaseProjectId && supabaseAnonKey
    ? createClient(`https://${supabaseProjectId}.supabase.co`, supabaseAnonKey)
    : null;

