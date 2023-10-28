import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../database.types.ts";
import type { APIRoute } from "astro";
import DOMPurify from "dompurify";

const PUBLIC_SUPABASE_URL="https://addcgxwkomotkbjjjoup.supabase.co"
const PUBLIC_SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkZGNneHdrb21vdGtiampqb3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ0NzQ3MjAsImV4cCI6MjAxMDA1MDcyMH0.X8fYKPrrKTzggrNvSimVh-CHWodI7LXduO6YMx4FF94"

const supabase = createClient<Database>(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_KEY
);

export const GET: APIRoute = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select()
      .order("comment_at", { ascending: false });
   
    if (data !== null) {
        for (const comment of data) {
            if (author !== null) {

            }
            const cleanAuthor = DOMPurify.sanitize(comment.author);
        }
    }

    return new Response(

    );
}
