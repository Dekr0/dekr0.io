import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types"

declare global {
    interface Window {
        supabase: SupabaseClient<Database> | null;
    }
}
