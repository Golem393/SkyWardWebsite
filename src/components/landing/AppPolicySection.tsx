import {
  MessageCircle,
  Gamepad2,
  EyeOff,
  Tv,
  Map,
  Mail,
  Landmark,
  Bot,
  Music,
  ShieldAlert,
  ShieldCheck,
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

export function AppPolicySection() {
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

        {/* App availability callout */}
        <div className="mt-10 rounded-2xl border border-border bg-card/60 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-medium text-foreground">Want to know if an app is available?</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              If the app is not related to the removed categories, it is available. To be sure, you can email us at hello@skywardos.com.
            </p>
          </div>
          <a
            href="mailto:hello@skywardos.com?subject=App availability question"
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium px-5 py-2 hover:bg-primary/90 transition-colors shadow-[0_8px_24px_-8px_rgba(125,167,217,0.5)]"
          >
            Ask about an app
          </a>
        </div>
      </div>
    </section>
  );
}
