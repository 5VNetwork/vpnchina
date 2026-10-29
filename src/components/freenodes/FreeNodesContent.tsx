"use client";

import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState, type ReactNode } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { AuthenticatedNodesView } from "./AuthenticatedNodesView";
import { FreeNodesGuide } from "./FreeNodesGuide";
import { OtpLoginPanel } from "./OtpLoginPanel";

export function FreeNodesContent() {
  const [client, setClient] = useState<SupabaseClient | null>(null);
  const [configError, setConfigError] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const c = createSupabaseBrowserClient();
    if (!c) {
      setConfigError(true);
      setAuthLoading(false);
      return;
    }
    setClient(c);

    let cancelled = false;
    void c.auth.getSession().then(({ data: { session: s } }) => {
      if (!cancelled) {
        setSession(s);
        setAuthLoading(false);
      }
    });

    const {
      data: { subscription },
    } = c.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  let nodesSection: ReactNode;
  if (configError) {
    nodesSection = (
      <div
        className="rounded-xl border border-line bg-white p-6"
        role="alert"
      >
        <p className="text-sm leading-relaxed text-muted">
          未配置 Supabase：请在环境变量中设置{" "}
          <code className="rounded bg-paper px-1 py-0.5 text-xs">
            NEXT_PUBLIC_SUPABASE_URL
          </code>{" "}
          与{" "}
          <code className="rounded bg-paper px-1 py-0.5 text-xs">
            NEXT_PUBLIC_SUPABASE_ANON_KEY
          </code>
          （或 Publishable Key）。
        </p>
      </div>
    );
  } else if (authLoading || !client) {
    nodesSection = (
      <p className="text-sm text-muted">正在检查登录状态…</p>
    );
  } else if (!session) {
    nodesSection = <OtpLoginPanel client={client} />;
  } else {
    nodesSection = (
      <AuthenticatedNodesView client={client} session={session} />
    );
  }

  return (
    <>
      <section
        className="rounded-xl border border-line bg-white/60 p-5 sm:p-6"
        aria-labelledby="free-nodes-section-title"
      >
        <h2
          id="free-nodes-section-title"
          className="text-lg font-semibold text-ink"
        >
          免费节点
        </h2>
        <div
          className={
            !session && !configError && !authLoading && client
              ? "mt-5 flex justify-center"
              : "mt-5"
          }
        >
          {nodesSection}
        </div>
      </section>
      <div className="mt-10">
        <FreeNodesGuide />
      </div>
    </>
  );
}
