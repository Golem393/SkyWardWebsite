import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const features = [
  "Block social, gaming, dating, gambling & adult sites",
  "One device per subscription",
  "Cancel anytime",
];

export function Pricing() {
  return (
    <section id="pricing" className="relative aurora px-6 py-24 md:py-32 overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Pricing</p>
        <h2 className="mt-4 text-3xl md:text-4xl font-semibold -tracking-[0.02em] text-foreground">
          One simple plan.
        </h2>

        <div className="mt-8 inline-flex items-center rounded-full glass p-1 text-sm">
          <button className="rounded-full bg-primary text-primary-foreground px-5 py-1.5 font-medium">
            Monthly
          </button>
          <button className="rounded-full px-5 py-1.5 text-muted-foreground">Annual</button>
        </div>

        <div
          className="mt-10 mx-auto max-w-md rounded-3xl bg-card border border-border p-8 text-left shadow-[0_30px_80px_-20px_rgba(125,167,217,0.45)] animate-fade-in"
          style={{ animationDelay: "120ms", animationFillMode: "both" }}
        >
          <div className="flex items-baseline justify-between">
            <h3 className="text-lg font-semibold text-foreground">Skyward</h3>
            <span className="text-xs uppercase tracking-widest text-accent">Most popular</span>
          </div>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-6xl font-semibold -tracking-[0.02em] text-foreground">$12</span>
            <span className="text-muted-foreground">/mo</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Billed monthly. Cancel anytime.</p>

          <Button
            onClick={() => window.location.href = 'https://buy.stripe.com/3cIfZjgjz0zv8IY9O7eME00'}
            className="mt-6 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 shadow-[0_12px_32px_-10px_rgba(125,167,217,0.7)]"
          >
            Get Monthly
          </Button>

          <ul className="mt-6 space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
