import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What exactly is Skyward?",
    a: "Skyward is a smartphone that ships with a curated OS that blocks distracting categories of apps and websites at the system level.",
  },
  {
    q: "Which devices are supported?",
    a: "We ship a dedicated Skyward device. Your subscription is tied to one device at a time.",
  },
  {
    q: "Can the blocks be bypassed?",
    a: "Blocking is enforced at the OS and network layer. Unless you're an elite hacker, the answer is no.",
  },
  {
    q: "Is there a refund policy?",
    a: "Yes — a 30-day money-back guarantee on your first month, no questions asked.",
  },
  {
    q: "How long does shipping take?",
    a: "Devices ship within 3–5 business days worldwide, with tracking.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="px-6 py-24 md:py-32">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground text-center">
          Questions
        </p>
        <h2 className="mt-4 text-3xl md:text-4xl font-semibold -tracking-[0.02em] text-foreground text-center">
          Frequently asked.
        </h2>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`item-${i}`}
              className="border-b border-border last:border-b-0"
            >
              <AccordionTrigger className="text-left text-foreground hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
