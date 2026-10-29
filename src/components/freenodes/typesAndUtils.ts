export type FetchEdgeResponse = {
  urls: string[];
  secret: string;
};

/** Must match `X-FQ-Client` allowed by Supabase Edge `fetch` auth. */
export const FETCH_CLIENT_HEADER = {
  "X-FQ-Client": "fanqiang-wiki" as const,
};

export type SubscriptionLine = {
  url: string;
  remark: string | null;
};

export function parseSubscriptionUrl(raw: string): SubscriptionLine {
  const hash = raw.indexOf("#");
  if (hash === -1) {
    return { url: raw, remark: null };
  }
  const frag = raw.slice(hash + 1);
  if (!frag.length) {
    return { url: raw, remark: null };
  }
  try {
    return {
      url: raw,
      remark: decodeURIComponent(frag.replace(/\+/g, " ")),
    };
  } catch {
    return { url: raw, remark: frag };
  }
}

export const OTP_SEND_COOLDOWN_MS = 60_000;

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}
