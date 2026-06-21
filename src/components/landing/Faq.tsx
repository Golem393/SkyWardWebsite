import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePostHog } from "@posthog/react";

const faqs = [
  {
    q: "Do you have a refund policy?",
    a: "Your first month is covered by a 30-day money-back guarantee. If you cancel, removed apps will stay gone until the subscription end date. If you need them added back earlier, email us at hello@skywardos.com.",
  },
  {
    q: "How do I contact your support team?",
    a: "If you have any questions, comments, or concerns, reach out to us at hello@skywardos.com.",
  },
];

export function Faq() {
  const posthog = usePostHog();

  return (
    <section id="faq" className="px-6 py-24 md:py-32">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground text-center">
          Questions
        </p>
        <h2 className="mt-4 text-3xl md:text-4xl font-semibold -tracking-[0.02em] text-foreground text-center">
          Frequently asked.
        </h2>
        <Accordion
          type="single"
          collapsible
          className="mt-10"
          onValueChange={(value) => {
            if (value) {
              const faq = faqs[parseInt(value.replace("item-", ""))];
              posthog.capture("faq_item_opened", { question: faq?.q });
            }
          }}
        >
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
