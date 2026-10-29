"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useRef, useState } from "react";
import { normalizeEmail, OTP_SEND_COOLDOWN_MS } from "./typesAndUtils";

type Props = {
  client: SupabaseClient;
};

const inputClass =
  "mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-brand/40";
const btnPrimary =
  "rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-navy disabled:opacity-50";
const btnSecondary =
  "rounded-lg border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-paper disabled:opacity-50";

export function OtpLoginPanel({ client }: Props) {
  const [sendLoading, setSendLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const lastOtpSentAtRef = useRef(0);
  const [otpCooldownSec, setOtpCooldownSec] = useState(0);

  useEffect(() => {
    if (otpCooldownSec <= 0) {
      return;
    }
    const id = window.setInterval(() => {
      const elapsed = Date.now() - lastOtpSentAtRef.current;
      const left = Math.ceil((OTP_SEND_COOLDOWN_MS - elapsed) / 1000);
      setOtpCooldownSec(Math.max(0, left));
    }, 1000);
    return () => window.clearInterval(id);
  }, [otpCooldownSec]);

  const resetOtpForm = useCallback(() => {
    setOtp("");
    setOtpSent(false);
    setAuthError(null);
  }, []);

  const sendOtp = useCallback(async () => {
    const e = normalizeEmail(email);
    if (!e || !e.includes("@")) {
      setAuthError("请输入有效的邮箱地址。");
      return;
    }
    const sinceLast = Date.now() - lastOtpSentAtRef.current;
    if (lastOtpSentAtRef.current > 0 && sinceLast < OTP_SEND_COOLDOWN_MS) {
      const waitSec = Math.ceil((OTP_SEND_COOLDOWN_MS - sinceLast) / 1000);
      setAuthError(`发送过于频繁，请等待 ${waitSec} 秒后再试。`);
      return;
    }
    setAuthError(null);
    setSendLoading(true);
    const { error } = await client.auth.signInWithOtp({
      email: e,
      options: {
        shouldCreateUser: true,
      },
    });
    setSendLoading(false);
    if (error) {
      setAuthError(error.message);
      return;
    }
    lastOtpSentAtRef.current = Date.now();
    setOtpCooldownSec(Math.ceil(OTP_SEND_COOLDOWN_MS / 1000));
    setOtpSent(true);
    setOtp("");
  }, [client, email]);

  const verifyOtp = useCallback(async () => {
    const e = normalizeEmail(email);
    const code = otp.replace(/\s/g, "");
    if (!e || !code) {
      setAuthError("请输入邮箱与邮件中的验证码。");
      return;
    }
    setAuthError(null);
    setVerifyLoading(true);
    const { error } = await client.auth.verifyOtp({
      email: e,
      token: code,
      type: "email",
    });
    setVerifyLoading(false);
    if (error) {
      setAuthError(error.message);
      return;
    }
    resetOtpForm();
  }, [client, email, otp, resetOtpForm]);

  return (
    <div className="w-full max-w-md rounded-xl border border-line bg-white p-6 shadow-sm">
      <p className="text-base font-medium text-ink">查看免费节点需要先登录。</p>
      <p className="mt-2 text-sm text-muted">
        请输入邮箱，我们将发送验证码；在邮件中查收验证码后即可登录。
      </p>

      <div className="mt-4">
        <label
          className="text-xs font-medium uppercase tracking-wide text-muted"
          htmlFor="free-nodes-email"
        >
          邮箱
        </label>
        <input
          id="free-nodes-email"
          className={inputClass}
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          disabled={sendLoading || verifyLoading || otpCooldownSec > 0}
          placeholder="you@example.com"
        />
      </div>

      {!otpSent ? (
        <button
          type="button"
          className={`mt-4 w-full ${btnPrimary}`}
          onClick={() => void sendOtp()}
          disabled={sendLoading || verifyLoading || otpCooldownSec > 0}
        >
          {sendLoading
            ? "发送中…"
            : otpCooldownSec > 0
              ? `请等待 ${otpCooldownSec} 秒`
              : "发送验证码"}
        </button>
      ) : (
        <>
          <div className="mt-4">
            <label
              className="text-xs font-medium uppercase tracking-wide text-muted"
              htmlFor="free-nodes-otp"
            >
              验证码
            </label>
            <input
              id="free-nodes-otp"
              className={inputClass}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={otp}
              onChange={(ev) => setOtp(ev.target.value)}
              disabled={verifyLoading}
              placeholder="邮件中的 6 位数字"
              maxLength={12}
            />
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              className={`flex-1 ${btnPrimary}`}
              onClick={() => void verifyOtp()}
              disabled={verifyLoading || sendLoading}
            >
              {verifyLoading ? "验证中…" : "验证并登录"}
            </button>
            <button
              type="button"
              className={`flex-1 ${btnSecondary}`}
              onClick={() => void sendOtp()}
              disabled={sendLoading || verifyLoading || otpCooldownSec > 0}
            >
              {sendLoading
                ? "发送中…"
                : otpCooldownSec > 0
                  ? `重新发送（${otpCooldownSec}s）`
                  : "重新发送验证码"}
            </button>
          </div>
        </>
      )}

      {authError ? (
        <p className="mt-4 text-sm text-brand" role="alert">
          {authError}
        </p>
      ) : null}
    </div>
  );
}
