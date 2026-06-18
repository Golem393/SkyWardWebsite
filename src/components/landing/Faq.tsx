import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How is Skyward different from other app blockers?",
    a: "Traditional app blockers let you choose what to block and give you the ability to remove those restrictions at any time. Skyward uses a curated blocklist and a specialized setup process so that distracting apps and websites stay blocked without your willpower.",
  },
  {
    q: "Which devices are supported?",
    a: "Currently, Skyward supports Samsung, Google, and Motorola phones running Android 11 or higher.",
  },
  {
    q: "Which apps can I still use?",
    a: "Skyward is designed to block distractions, not useful tools. Messaging, navigation, banking, productivity, travel, music, and many other apps remain available.",
  },
  {
    q: "Why is a factory reset required?",
    a: "Skyward needs special control over the device that normal apps don't have. This is what allows the blocked apps to stay gone.",
  },
  {
    q: "What if Skyward isn't right for me?",
    a: "Your first month is covered by a 30-day money-back guarantee. If you cancel, apps & websites will be blocked until the subscription end date. If you want to purchase Skyward again in the future, you will have to factory reset your phone once more.",
  },
  {
    q: "How do I contact your support team?",
    a: "If you have any questions, comments, or concerns, reach out to us at hello@skywardos.com.",
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
