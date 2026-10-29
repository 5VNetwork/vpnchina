"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "vpnchina-freenodes-ads-notice-dismissed";

type AdsNoticeBannerProps = {
  title?: string;
  body?: string;
  dismissLabel?: string;
};

const DEFAULT_TITLE = "广告说明";
const DEFAULT_BODY =
  "本页有横幅、跳转、弹窗广告。广告收入可以让我们持续提供免费节点服务。广告由第三方广告网络提供，我们无法审核或控制广告内容，也无法保证广告内容的真实性。当您打开广告页面时，请保持警惕：不要发送短信、不要输入敏感信息等。您在本页内遇到的所有弹窗均为弹窗广告。";
const DEFAULT_DISMISS = "关闭通知";

export function AdsNoticeBanner({
  title = DEFAULT_TITLE,
  body = DEFAULT_BODY,
  dismissLabel = DEFAULT_DISMISS,
}: AdsNoticeBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      // Ignore storage errors (private mode, etc.) and still show the notice.
    }
    setVisible(true);
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore storage errors; notice stays dismissed for this session.
    }
  }

  if (!visible) return null;

  return (
    <div
      role="status"
      className="rounded-xl border border-brand/25 bg-brand/5 px-4 py-3 text-ink shadow-sm"
    >
      <div className="flex items-start gap-3">
        <svg
          className="mt-0.5 h-5 w-5 shrink-0 text-brand"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
        <div className="min-w-0 flex-1 space-y-1 text-sm leading-relaxed">
          <p className="font-medium text-ink">{title}</p>
          <p className="text-muted">{body}</p>
          <p className="text-muted">
            详见{" "}
            <Link
              href="/terms#ads"
              className="font-medium text-brand underline-offset-4 hover:underline"
            >
              服务条款 · 第三方广告免责声明
            </Link>
            。
          </p>
        </div>
        <button
          type="button"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-brand/10 hover:text-ink"
          onClick={dismiss}
          aria-label={dismissLabel}
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
