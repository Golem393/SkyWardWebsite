import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePostHog } from "@posthog/react";

const faqs = [
  {
    q: "What is Skyward?",
    a: "Skyward is a software solution that uses enterprise-grade MDM (Mobile Device Management) technology to make phones addiction-free devices. We block any app or website that is related to social media, gaming, porn, or entertainment.",
  },
  {
    q: "Can I unblock a specific app or customize the list?",
    a: "No - and that is why it works. Standard app blockers fail because they allow you to negotiate with yourself. Skyward functions like a dumbphone - the boundaries are set at the system level.",
  },
  {
    q: "Will I lose my photos, contacts, or chat history during a factory reset?",
    a: "A factory reset wipes all data from the phone, so data will be lost only if you did not back up your data. If you are uncomfortable with doing this, we recommend purchasing a new, budget-friendly Android phone to use with Skyward instead - allowing you to skip the reset entirely.",
  },
  {
    q: "Can Skyward see or read my private data?",
    a: "No. We have zero access to your personal life. We cannot read your text messages, view your photos, track your location, or see what you type.",
  },
  {
    q: "What if I change my mind? Can I ever remove Skyward?",
    a: "Yes, you can remove Skyward and restore your phone by canceling your subscription. Your phone will be back to normal on the subscription's end date or you can request an immediate unenrollment.",
  },
  {
    q: "How do I contact your support team?",
    a: "If you have any questions, comments, or concerns, reach out to us at hello@skywardos.com.",
  },
];

export function Faq() {
  const posthog = usePostHog();

  return (
    <section
      id="faq"
      className="px-6 py-24 md:py-32 bg-slate-100 dark:bg-zinc-900/60 border-y border-slate-300 dark:border-zinc-800 relative overflow-hidden"
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="mt-4 text-3xl md:text-4xl font-semibold -tracking-[0.02em] text-foreground text-center">
          Additional info.
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
