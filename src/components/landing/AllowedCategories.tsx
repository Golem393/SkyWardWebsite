import {
  Bot,
  MessageCircle,
  Car,
  Landmark,
  Map,
  Music,
  Mail,
  Home,
  Calendar,
  type LucideIcon,
} from "lucide-react";

const items: { label: string; Icon: LucideIcon }[] = [
  { label: "ChatGPT", Icon: Bot },
  { label: "Whatsapp", Icon: MessageCircle },
  { label: "Uber", Icon: Car },
  { label: "Banking", Icon: Landmark },
  { label: "Maps", Icon: Map },
  { label: "Spotify", Icon: Music },
  { label: "Email", Icon: Mail },
  { label: "Airbnb", Icon: Home },
  { label: "Calendar", Icon: Calendar },
];

export function AllowedCategories() {
  return (
    <section className="px-6 pb-24 md:pb-32">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">What we allow</p>
        <h2 className="mt-4 text-3xl md:text-4xl font-semibold -tracking-[0.02em] text-foreground text-balance">
          Essential tools for life.
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {items.map(({ label, Icon }) => (
            <div
              key={label}
              className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm text-foreground shadow-[0_4px_16px_-8px_rgba(30,41,59,0.12)] hover:-translate-y-0.5 transition-transform"
            >
              <Icon className="h-4 w-4 text-accent" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
