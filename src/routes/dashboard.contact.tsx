import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { sendContactMessage } from "@/lib/backend";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Mail } from "lucide-react";

export const Route = createFileRoute("/dashboard/contact")({
  component: ContactPage,
});

function ContactPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      toast.error("Please fill out both the subject and message.");
      return;
    }

    setSending(true);
    try {
      await sendContactMessage(subject, message);
      toast.success("Message sent! We'll get back to you soon.");
      setSubject("");
      setMessage("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't send the message.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="py-8">
      <main className="mx-auto w-full max-w-2xl px-4 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-full text-primary">
            <Mail className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Contact Support</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Have a question or need help? Send us a message and we'll reply to your email.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
            <CardDescription>
              We typically respond within 24 hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="How can we help?"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={sending}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Describe your issue or question in detail..."
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={sending}
                  required
                  className="resize-none"
                />
              </div>

              <Button type="submit" className="w-full sm:w-auto" disabled={sending}>
                {sending ? "Sending..." : "Send Message"}
                {!sending && <Send className="w-4 h-4 ml-2" />}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
