import { useState, useRef } from "react";
import {
  MessageCircle,
  Gamepad2,
  EyeOff,
  Tv,
  Map,
  Mail,
  Landmark,
  Bot,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Search,
  Loader2,
  type LucideIcon,
  ShoppingCart,
} from "lucide-react";

interface Category {
  id: string;
  label: string;
  description: string;
  Icon: LucideIcon;
  apps: string[];
}

const blockedCategories: Category[] = [
  {
    id: "social",
    label: "Social Media",
    description: "Addictive feeds designed to keep you scrolling infinitely.",
    Icon: MessageCircle,
    apps: [
      "Instagram",
      "Youtube",
      "TikTok",
      "Facebook",
      "X",
      "Snapchat",
      "Reddit",
      "Pinterest",
      "Threads",
      "LinkedIn",
      "Discord & more",
    ],
  },
  {
    id: "gaming",
    label: "Gaming",
    description: "Hyper-engaging mobile games that drain your productivity.",
    Icon: Gamepad2,
    apps: [
      "Roblox",
      "Candy Crush",
      "Among Us",
      "Call of Duty",
      "PUBG Mobile",
      "Clash of Clans",
      "Subway Surfers",
      "Minecraft",
      "Monopoly Go",
      "Brawl Stars & more",
    ],
  },
  {
    id: "adult",
    label: "Adult Sites",
    description: "Explicit websites and adult content.",
    Icon: EyeOff,
    apps: ["All explicit and pornographic websites"],
  },
  {
    id: "entertainment",
    label: "Entertainment",
    description: "Short-form and long-form video feeds with endless autoplay.",
    Icon: Tv,
    apps: [
      "Netflix",
      "Disney+",
      "Prime Video",
      "Hulu",
      "Max (HBO)",
      "Twitch",
      "Peacock",
      "YouTube TV",
      "Paramount+ & more",
    ],
  },
];

const allowedCategories: Category[] = [
  {
    id: "messaging",
    label: "Messaging",
    description: "The necessary communication tools.",
    Icon: Bot,
    apps: ["WhatsApp", "TextNow", "Telegram", "Signal", "Google Voice & more"],
  },
  {
    id: "travel",
    label: "Travel & Transportation",
    description: "Essential tools for navigation and travel.",
    Icon: Map,
    apps: ["Google Maps", "Uber", "Lyft", "Waze", "Airbnb", "Booking.com", "Expedia", "Trip.com, & more"],
  },
  {
    id: "work",
    label: "Work & Productivity",
    description: "The tools used for work & productivity.",
    Icon: Mail,
    apps: [
      "Gmail",
      "Outlook",
      "Google Calendar",
      "ChatGPT",
      "Slack",
      "Microsoft Teams",
      "Zoom",
      "Notion & more",
    ],
  },
  {
    id: "finance",
    label: "Banking & Finance",
    description: "Securely manage bank accounts, mobile payments, and wallets.",
    Icon: Landmark,
    apps: [
      "Chase Bank",
      "Bank of America",
      "PayPal",
      "Wise",
      "Revolut",
      "Venmo",
      "Cash App",
      "Google Wallet",
      "Robinhood",
      "Coinbase & more",
    ],
  },
  {
    id: "everyday",
    label: "Everyday Essentials",
    description: "What you need in your day to day life",
    Icon: ShoppingCart,
    apps: ["Amazon", "Walmart", "Spotify", "Duolingo", "DoorDash", "Instacart & more"],
  },
];

// ─── Types ───────────────────────────────────────────────────────────────────

type SearchStatus = "allowed" | "blocked" | "unknown";

interface SearchResult {
  appName: string | null;
  status: SearchStatus;
  category: string;
}

// ─── Backend call ─────────────────────────────────────────────────────────────

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

async function searchAppPolicy(query: string): Promise<SearchResult> {
  const url = new URL(`${BACKEND_URL}/api/blocked-app-search`);
  url.searchParams.set("app_name", query);

  const res = await fetch(url.toString());
  if (res.status === 404) throw new Error("App not found");
  if (!res.ok) throw new Error(`Server error (${res.status})`);

  const data = await res.json();
  return {
    appName: data.appName ?? null,
    status: (data.status?.toLowerCase() as SearchStatus) ?? "unknown",
    category: data.category ?? "Unknown",
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AppPolicySection() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await searchAppPolicy(q);
      setResult(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 pt-24 pb-12 md:pt-32 md:pb-16 relative overflow-hidden bg-background">
      {/* Subtle background aurora effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold -tracking-[0.02em] text-foreground leading-tight">
            What goes. What stays.
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">
            Skyward disables the attention economy while giving you access to essential tools.
          </p>
        </div>

        {/* Side-by-Side Containers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Blocked Column */}
          <div className="flex flex-col rounded-3xl border border-border/80 bg-card/30 dark:bg-card/10 backdrop-blur-md p-6 md:p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/50">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-red-500">
                  Strictly Restricted
                </span>
                <h3 className="text-2xl font-semibold mt-1">Removed by Skyward</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                <ShieldAlert className="h-5 w-5" />
              </div>
            </div>

            <div className="space-y-6 flex-1">
              {blockedCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="group rounded-2xl border border-border bg-card/80 p-5 shadow-sm hover:shadow-[0_12px_30px_-10px_rgba(239,68,68,0.12)] hover:border-red-200/50 dark:hover:border-red-950 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-red-500/5 text-red-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <cat.Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <h4 className="font-medium text-foreground text-base group-hover:text-red-500 transition-colors">
                        {cat.label}
                      </h4>
                      <div className="mt-1 text-sm leading-relaxed">
                        <span className="font-semibold text-muted-foreground">Apps: </span>
                        <span className="text-muted-foreground/80">{cat.apps.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Allowed Column */}
          <div className="flex flex-col rounded-3xl border border-border/80 bg-card/30 dark:bg-card/10 backdrop-blur-md p-6 md:p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/50">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-emerald-500">
                  Fully Accessible
                </span>
                <h3 className="text-2xl font-semibold mt-1">Allowed by Skyward</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
            </div>

            <div className="space-y-6 flex-1">
              {allowedCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="group rounded-2xl border border-border bg-card/80 p-5 shadow-sm hover:shadow-[0_12px_30px_-10px_rgba(16,185,129,0.12)] hover:border-emerald-200/50 dark:hover:border-emerald-950 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/5 text-emerald-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <cat.Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <h4 className="font-medium text-foreground text-base group-hover:text-emerald-500 transition-colors">
                        {cat.label}
                      </h4>
                      <div className="mt-1 text-sm leading-relaxed">
                        <span className="font-semibold text-muted-foreground">Apps: </span>
                        <span className="text-muted-foreground/80">{cat.apps.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* App Search */}
        <div className="mt-12 rounded-3xl border border-border bg-card/60 backdrop-blur-md px-6 py-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.06)]">
          <div className="max-w-xl mx-auto">
            <p className="text-center font-semibold text-lg text-foreground mb-1">
              Check any app
            </p>
            <p className="text-center text-sm text-muted-foreground mb-6">
              Search to instantly see whether an app is allowed or blocked on Skyward.
            </p>

            {/* Input row */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  ref={inputRef}
                  id="app-policy-search"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="e.g. Airbnb, Spotify, Instagram…"
                  className="w-full rounded-full border border-border bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                />
              </div>
              <button
                id="app-policy-search-btn"
                onClick={handleSearch}
                disabled={loading || !query.trim()}
                className="shrink-0 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground text-sm font-medium px-5 py-2.5 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_8px_24px_-8px_rgba(125,167,217,0.5)] hover:shadow-[0_12px_30px_-8px_rgba(125,167,217,0.6)]"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Search"
                )}
              </button>
            </div>

            {/* Result */}
            {(result || error) && (
              <div className="mt-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {error ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-border bg-muted/40 px-5 py-4">
                    <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">{error === "App not found" ? "No app found — try a different name." : error}</p>
                  </div>
                ) : result?.status === "allowed" ? (
                  <div className="flex items-center gap-4 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/60 bg-emerald-500/5 px-5 py-4 shadow-[0_6px_20px_-8px_rgba(16,185,129,0.2)]">
                    <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {result.appName ?? query} — Allowed
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 rounded-2xl border border-red-200/60 dark:border-red-900/60 bg-red-500/5 px-5 py-4 shadow-[0_6px_20px_-8px_rgba(239,68,68,0.15)]">
                    <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                      <ShieldX className="h-5 w-5" />
                    </div>
                    <p className="font-semibold text-red-500 dark:text-red-400">
                      {result?.appName ?? query} — Blocked
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
