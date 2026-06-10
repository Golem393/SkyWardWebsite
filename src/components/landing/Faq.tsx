import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What exactly is Skyward?",
    a: "Skyward is a software that blocks distracting apps and websites at the system level.",
  },
  {
    q: "Can I choose which apps & websites to block?",
    a: "Not quite. We handle the blocklist for you. However, we make changes to this list based on user feedback, so let us know if you have any suggestions.",
  },
  {
    q: "Can the blocks be bypassed?",
    a: "Blocking is enforced at the OS (operating system) and network layer. Unless you're an elite hacker, you cannot bypass our software.",
  },
  {
    q: "Which devices are supported?",
    a: "Currently, only Samsung, Google, & Motorola phones with an Android version 11.0 and above are supported.",
  },
  {
    q: "Is there a refund policy?",
    a: "Yes — a 30-day money-back guarantee on your first month, no questions asked.",
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
