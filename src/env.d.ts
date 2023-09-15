/// <reference types="astro/client" />

import type { SupabaseClient } from "@supabase/supabase-js";

declare global {
    var supabase: SupabaseClient;
}
