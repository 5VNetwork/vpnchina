import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { getSupabasePublicEnv } from "@/lib/supabase/env";

function nextWithPathname(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

/**
 * Refreshes the Supabase auth cookie on each request so the browser
 * client and any future Server Components share the same session.
 * Also forwards pathname for freenodes-only ad scripts in the root layout.
 */
export async function middleware(request: NextRequest) {
  const env = getSupabasePublicEnv();
  if (!env) {
    return nextWithPathname(request);
  }

  let supabaseResponse = nextWithPathname(request);

  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = nextWithPathname(request);
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  await supabase.auth.getUser();

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
