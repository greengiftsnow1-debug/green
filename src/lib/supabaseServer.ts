import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Works in Next.js 14 — cookies() is async, so we await it.
 */
export async function supabaseServer() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set(name, value, options);
          } catch (err) {
            console.log("Cookie set blocked:", err);
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set(name, "", { ...options, maxAge: 0 });
          } catch (err) {
            console.log("Cookie remove blocked:", err);
          }
        },
      },
    }
  );
}
