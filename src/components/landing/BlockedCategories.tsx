import {
  MessageCircle,
  Gamepad2,
  Heart,
  Dices,
  EyeOff,
  Newspaper,
  type LucideIcon,
} from "lucide-react";

const items: { label: string; Icon: LucideIcon }[] = [
  { label: "Social media", Icon: MessageCircle },
  { label: "Gaming", Icon: Gamepad2 },
  //{ label: "Dating", Icon: Heart },
  //{ label: "Gambling", Icon: Dices },
  { label: "Adult sites", Icon: EyeOff },
  { label: "News", Icon: Newspaper },
];

export function BlockedCategories() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Categories we block
        </p>
        <h2 className="mt-4 text-3xl md:text-4xl font-semibold -tracking-[0.02em] text-foreground text-balance">
          Less noise. More life.
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
