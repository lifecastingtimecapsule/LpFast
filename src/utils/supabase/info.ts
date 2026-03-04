/**
 * Supabase project and Edge Function base URL for public reservation API.
 * All reservation API calls use this base URL and anon key.
 */
const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabaseProjectId = projectId ?? "";
export const supabaseAnonKey = anonKey ?? "";

export const functionsBaseUrl =
  projectId
    ? `https://${projectId}.supabase.co/functions/v1/make-server-fe84bde0`
    : "";
