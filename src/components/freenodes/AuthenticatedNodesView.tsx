"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { QRCodeSVG } from "qrcode.react";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdCheck, MdContentCopy, MdRefresh } from "react-icons/md";
import {
  FETCH_CLIENT_HEADER,
  type FetchEdgeResponse,
  parseSubscriptionUrl,
  type SubscriptionLine,
} from "./typesAndUtils";

type Props = {
  client: SupabaseClient;
  session: Session;
};

const btnPrimary =
  "rounded-lg bg-ink px-3 py-2 text-sm font-medium text-paper transition-colors hover:bg-navy disabled:opacity-50";

const btnSecondary =
  "rounded-lg border border-line bg-paper px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-white disabled:opacity-50";

const REFRESH_COOLDOWN_MS = 60_000;

export function AuthenticatedNodesView({ client, session }: Props) {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshBlockedUntil, setRefreshBlockedUntil] = useState(0);
  const [fetchLines, setFetchLines] = useState<SubscriptionLine[] | null>(null);
  const [subscriptionUrl, setSubscriptionUrl] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [nodeActionCopied, setNodeActionCopied] = useState<"all" | "vx" | null>(
    null,
  );
  const [subscriptionActionCopied, setSubscriptionActionCopied] = useState<
    "url" | "vx" | null
  >(null);
  const [nodeActionError, setNodeActionError] = useState<string | null>(null);
  const [showNodesQrCode, setShowNodesQrCode] = useState(false);
  const [showSubscriptionQrCode, setShowSubscriptionQrCode] = useState(false);
  const [subscriptionCopied, setSubscriptionCopied] = useState(false);
  const copyResetRef = useRef<number | null>(null);
  const nodeActionResetRef = useRef<number | null>(null);
  const subscriptionActionResetRef = useRef<number | null>(null);
  const subscriptionCopyResetRef = useRef<number | null>(null);

  const clearNodeActionCopiedTimer = useCallback(() => {
    if (nodeActionResetRef.current !== null) {
      window.clearTimeout(nodeActionResetRef.current);
      nodeActionResetRef.current = null;
    }
  }, []);

  const clearSubscriptionActionCopiedTimer = useCallback(() => {
    if (subscriptionActionResetRef.current !== null) {
      window.clearTimeout(subscriptionActionResetRef.current);
      subscriptionActionResetRef.current = null;
    }
  }, []);

  const clearSubscriptionCopyTimer = useCallback(() => {
    if (subscriptionCopyResetRef.current !== null) {
      window.clearTimeout(subscriptionCopyResetRef.current);
      subscriptionCopyResetRef.current = null;
    }
  }, []);

  const markNodeActionCopied = useCallback(
    (type: "all" | "vx") => {
      clearNodeActionCopiedTimer();
      setNodeActionCopied(type);
      nodeActionResetRef.current = window.setTimeout(() => {
        setNodeActionCopied(null);
        nodeActionResetRef.current = null;
      }, 2000);
    },
    [clearNodeActionCopiedTimer],
  );

  const markSubscriptionActionCopied = useCallback(
    (type: "url" | "vx") => {
      clearSubscriptionActionCopiedTimer();
      setSubscriptionActionCopied(type);
      subscriptionActionResetRef.current = window.setTimeout(() => {
        setSubscriptionActionCopied(null);
        subscriptionActionResetRef.current = null;
      }, 2000);
    },
    [clearSubscriptionActionCopiedTimer],
  );

  const writeClipboard = useCallback(async (text: string) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "true");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textArea);
    if (!ok) {
      throw new Error("clipboard unavailable");
    }
  }, []);

  const signOut = useCallback(async () => {
    setFetchError(null);
    setFetchLines(null);
    setSubscriptionUrl(null);
    await client.auth.signOut();
  }, [client]);

  const copyUrl = useCallback(
    async (text: string, index: number) => {
      if (copyResetRef.current !== null) {
        window.clearTimeout(copyResetRef.current);
      }
      try {
        await writeClipboard(text);
        setCopiedIndex(index);
        copyResetRef.current = window.setTimeout(() => {
          setCopiedIndex(null);
          copyResetRef.current = null;
        }, 2000);
      } catch {
        setCopiedIndex(null);
      }
    },
    [writeClipboard],
  );

  const copyAllUrls = useCallback(async () => {
    if (!fetchLines || fetchLines.length === 0) {
      return;
    }
    setNodeActionError(null);
    const allUrls = fetchLines.map((line) => line.url).join("\r\n");
    try {
      await writeClipboard(allUrls);
      markNodeActionCopied("all");
    } catch {
      setNodeActionCopied(null);
      setNodeActionError(
        "复制失败：请检查浏览器剪贴板权限，或手动复制下方节点链接。",
      );
    }
  }, [fetchLines, markNodeActionCopied, writeClipboard]);

  const getJoinedUrls = useCallback(() => {
    if (!fetchLines || fetchLines.length === 0) {
      return "";
    }
    return fetchLines.map((line) => line.url).join("\r\n");
  }, [fetchLines]);

  const openVxDeepLink = useCallback((pathAndQuery: string) => {
    const deepLink = `vx://${pathAndQuery}`;
    const isAndroid = /Android/i.test(window.navigator.userAgent);
    const openUrl = isAndroid
      ? `intent://${pathAndQuery}#Intent;scheme=vx;end`
      : deepLink;
    window.location.assign(openUrl);
  }, []);

  const openVxNodesDeepLink = useCallback(() => {
    const joined = getJoinedUrls();
    if (!joined) {
      return;
    }
    const base64Content = window.btoa(joined);
    const name = "科学节点";
    const pathAndQuery = `nodes?content=${encodeURIComponent(base64Content)}&name=${encodeURIComponent(name)}&replace=true`;
    try {
      openVxDeepLink(pathAndQuery);
      markNodeActionCopied("vx");
    } catch {
      setNodeActionCopied(null);
    }
  }, [getJoinedUrls, markNodeActionCopied, openVxDeepLink]);

  const copySubscriptionUrl = useCallback(async () => {
    if (!subscriptionUrl) {
      return;
    }
    clearSubscriptionCopyTimer();
    try {
      await writeClipboard(subscriptionUrl);
      setSubscriptionCopied(true);
      markSubscriptionActionCopied("url");
      subscriptionCopyResetRef.current = window.setTimeout(() => {
        setSubscriptionCopied(false);
        subscriptionCopyResetRef.current = null;
      }, 2000);
    } catch {
      setSubscriptionCopied(false);
    }
  }, [
    clearSubscriptionCopyTimer,
    markSubscriptionActionCopied,
    subscriptionUrl,
    writeClipboard,
  ]);

  const openVxSubscriptionDeepLink = useCallback(() => {
    if (!subscriptionUrl) {
      return;
    }
    const name = "科学订阅";
    const pathAndQuery = `install-config?url=${encodeURIComponent(subscriptionUrl)}&name=${encodeURIComponent(name)}`;
    try {
      openVxDeepLink(pathAndQuery);
      markSubscriptionActionCopied("vx");
    } catch {
      setSubscriptionActionCopied(null);
    }
  }, [markSubscriptionActionCopied, openVxDeepLink, subscriptionUrl]);

  const loadNodes = useCallback(async (): Promise<void> => {
    const { data, error } = await client.functions.invoke<FetchEdgeResponse>(
      "fetch",
      {
        body: {},
        headers: FETCH_CLIENT_HEADER,
      },
    );
    if (error) {
      setFetchError(error.message);
      setFetchLines(null);
      return;
    }
    if (!data || !Array.isArray(data.urls)) {
      setFetchError("返回数据格式异常");
      setFetchLines(null);
      setSubscriptionUrl(null);
      return;
    }
    setFetchLines(data.urls.map(parseSubscriptionUrl));
    if (typeof data.secret === "string" && data.secret.trim().length > 0) {
      const supabaseUrl = (client as unknown as { supabaseUrl?: string })
        .supabaseUrl;
      if (supabaseUrl) {
        setSubscriptionUrl(
          `${supabaseUrl}/functions/v1/subscription/${data.secret}`,
        );
      } else {
        setSubscriptionUrl(null);
      }
    } else {
      setSubscriptionUrl(null);
    }
  }, [client]);

  const refreshCooldownRemaining = Math.max(
    0,
    Math.ceil((refreshBlockedUntil - Date.now()) / 1000),
  );

  const handleRefresh = useCallback(() => {
    if (fetchLoading || refreshing || refreshCooldownRemaining > 0) {
      return;
    }
    setRefreshBlockedUntil(Date.now() + REFRESH_COOLDOWN_MS);
    setFetchError(null);
    setRefreshing(true);
    void loadNodes().finally(() => {
      setRefreshing(false);
    });
  }, [fetchLoading, loadNodes, refreshCooldownRemaining, refreshing]);

  useEffect(() => {
    if (refreshBlockedUntil <= Date.now()) {
      return undefined;
    }
    const id = window.setInterval(() => {
      setRefreshBlockedUntil((until) => (until <= Date.now() ? 0 : until));
    }, 1000);
    return () => {
      window.clearInterval(id);
    };
  }, [refreshBlockedUntil]);

  useEffect(() => {
    let cancelled = false;
    setFetchLoading(true);
    setFetchError(null);
    void loadNodes().finally(() => {
      if (!cancelled) {
        setFetchLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [client, session.user.id, loadNodes]);

  useEffect(() => {
    return () => {
      if (copyResetRef.current !== null) {
        window.clearTimeout(copyResetRef.current);
      }
      clearNodeActionCopiedTimer();
      clearSubscriptionActionCopiedTimer();
      clearSubscriptionCopyTimer();
    };
  }, [
    clearNodeActionCopiedTimer,
    clearSubscriptionActionCopiedTimer,
    clearSubscriptionCopyTimer,
  ]);

  const menuContentClass =
    "z-50 min-w-[12rem] rounded-lg border border-line bg-white p-1 shadow-lg";
  const menuItemClass =
    "flex w-full cursor-pointer select-none rounded-md px-2 py-2 text-sm text-ink outline-none data-[highlighted]:bg-paper";

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3 border-b border-line pb-4">
        <span className="text-sm text-muted">
          已登录：{session.user.email ?? session.user.id}
        </span>
        <button
          type="button"
          className={`inline-flex items-center gap-1.5 ${btnSecondary}`}
          disabled={
            fetchLoading || refreshing || refreshCooldownRemaining > 0
          }
          title={
            refreshCooldownRemaining > 0
              ? `请 ${refreshCooldownRemaining} 秒后再试`
              : "重新获取节点列表"
          }
          onClick={handleRefresh}
        >
          <MdRefresh
            size={18}
            aria-hidden
            className={refreshing ? "animate-spin" : undefined}
          />
          {refreshing
            ? "刷新中…"
            : refreshCooldownRemaining > 0
              ? `刷新（${refreshCooldownRemaining}s）`
              : "刷新节点"}
        </button>
        <button
          type="button"
          className={btnSecondary}
          onClick={() => void signOut()}
        >
          退出
        </button>
      </div>

      {refreshing && fetchLines && fetchLines.length > 0 ? (
        <p className="text-sm text-muted">正在刷新节点…</p>
      ) : null}

      {fetchLoading ? (
        <p className="text-sm text-muted">正在加载节点…</p>
      ) : fetchError ? (
        <p className="text-sm text-brand" role="alert">
          加载失败：{fetchError}
        </p>
      ) : !fetchLines || fetchLines.length === 0 ? (
        <p className="text-sm text-muted">暂无可用节点链接，请明日再试。</p>
      ) : (
        <>
          {subscriptionUrl ? (
            <section>
              <h3 className="mb-3 text-base font-semibold text-ink">
                订阅连接
              </h3>
              <div className="mb-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  className={btnPrimary}
                  onClick={() => void copySubscriptionUrl()}
                >
                  {subscriptionActionCopied === "url"
                    ? "已复制订阅链接"
                    : "复制订阅链接"}
                </button>
                <button
                  type="button"
                  className={btnPrimary}
                  onClick={() => setShowSubscriptionQrCode((prev) => !prev)}
                >
                  {showSubscriptionQrCode ? "隐藏二维码" : "显示二维码"}
                </button>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button type="button" className={btnPrimary}>
                      直接导入客户端
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className={menuContentClass}
                      sideOffset={6}
                      align="start"
                    >
                      <DropdownMenu.Item
                        className={menuItemClass}
                        onSelect={() => openVxSubscriptionDeepLink()}
                      >
                        VX
                        {subscriptionActionCopied === "vx" ? "（已打开）" : ""}
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>
              {showSubscriptionQrCode ? (
                <div className="mb-4 inline-flex flex-col items-center gap-2 rounded-xl border border-line bg-paper p-4">
                  <QRCodeSVG value={subscriptionUrl} size={220} includeMargin />
                  <p className="text-xs text-muted">订阅链接</p>
                </div>
              ) : null}
              <div className="rounded-xl border border-line bg-white p-4">
                <div className="mb-2 text-sm text-muted">订阅 URL</div>
                <button
                  type="button"
                  className="flex w-full items-start gap-2 rounded-lg border border-line bg-paper px-3 py-2 text-left font-mono text-xs leading-relaxed text-ink"
                  onClick={() => void copySubscriptionUrl()}
                  title="点击复制订阅链接"
                >
                  <span className="min-w-0 flex-1 break-all">
                    {subscriptionUrl}
                  </span>
                  <span
                    className={
                      subscriptionCopied
                        ? "shrink-0 text-emerald-700"
                        : "shrink-0 text-muted"
                    }
                    aria-hidden
                  >
                    {subscriptionCopied ? (
                      <MdCheck size={20} />
                    ) : (
                      <MdContentCopy size={20} />
                    )}
                  </span>
                </button>
              </div>
            </section>
          ) : null}

          <section className="mt-8">
            <h3 className="mb-3 text-base font-semibold text-ink">节点</h3>
            <div className="mb-4 flex flex-wrap gap-2">
              <button
                type="button"
                className={btnPrimary}
                onClick={() => void copyAllUrls()}
              >
                {nodeActionCopied === "all" ? "已复制全部" : "复制全部"}
              </button>
              <button
                type="button"
                className={btnPrimary}
                onClick={() => setShowNodesQrCode((prev) => !prev)}
              >
                {showNodesQrCode ? "隐藏二维码" : "显示二维码"}
              </button>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button type="button" className={btnPrimary}>
                    直接导入客户端
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className={menuContentClass}
                    sideOffset={6}
                    align="start"
                  >
                    <DropdownMenu.Item
                      className={menuItemClass}
                      onSelect={() => openVxNodesDeepLink()}
                    >
                      VX{nodeActionCopied === "vx" ? "（已打开）" : ""}
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
            {nodeActionError ? (
              <p className="mb-4 text-sm text-brand" role="alert">
                {nodeActionError}
              </p>
            ) : null}
            {showNodesQrCode ? (
              <div className="mb-4 inline-flex flex-col items-center gap-2 rounded-xl border border-line bg-paper p-4">
                <QRCodeSVG value={getJoinedUrls()} size={220} includeMargin />
                <p className="text-xs text-muted">全部节点</p>
              </div>
            ) : null}
            <ul className="flex flex-col gap-4">
              {fetchLines.map((line, i) => (
                <li
                  key={`${i}-${line.url.slice(0, 48)}`}
                  className="rounded-xl border border-line bg-white p-4"
                >
                  {line.remark ? (
                    <div className="mb-2 font-medium text-ink">
                      备注：{line.remark}
                    </div>
                  ) : (
                    <div className="mb-2 text-sm text-muted">节点 {i + 1}</div>
                  )}
                  <button
                    type="button"
                    className="flex w-full items-start gap-2 rounded-lg border border-line bg-paper px-3 py-2 text-left font-mono text-xs leading-relaxed text-ink transition-colors hover:border-muted"
                    onClick={() => void copyUrl(line.url, i)}
                    title="点击复制完整链接"
                  >
                    <span className="min-w-0 flex-1 break-all">{line.url}</span>
                    <span
                      className={
                        copiedIndex === i
                          ? "shrink-0 text-emerald-700"
                          : "shrink-0 text-muted"
                      }
                      aria-hidden
                    >
                      {copiedIndex === i ? (
                        <MdCheck size={20} />
                      ) : (
                        <MdContentCopy size={20} />
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
