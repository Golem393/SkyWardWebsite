import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { usePostHog } from "@posthog/react";

export const Route = createFileRoute("/success")({
  ssr: false,
  component: SuccessPage,
});

interface RedditWindow extends Window {
  rdt?: (action: string, event: string) => void;
}

function SuccessPage() {
  const posthog = usePostHog();

  useEffect(() => {
    // Fire the Purchase event to the Reddit Pixel when the success page mounts
    if (typeof window !== "undefined") {
      const alreadyTracked = sessionStorage.getItem("reddit_pixel_purchase_tracked");

      if (!alreadyTracked) {
        const rdt = (window as unknown as RedditWindow).rdt;
        if (rdt) {
          rdt("track", "Purchase");
        }
        posthog.capture("subscription_purchased");
        sessionStorage.setItem("reddit_pixel_purchase_tracked", "true");
      }
    }
  }, [posthog]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f4f8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 16px 40px",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <Navbar />

      {/* Card */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "40px 36px 32px",
          width: "100%",
          maxWidth: "520px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
        }}
      >
        {/* Green checkmark icon */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              border: "2.5px solid #22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "22px",
            fontWeight: "700",
            color: "#0f172a",
            margin: "0 0 8px",
          }}
        >
          Thank you for your purchase!
        </h1>

        {/* Subtitle */}
        <p
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#64748b",
            margin: "0 0 28px",
          }}
        >
          Your subscription is now active.
        </p>

        {/* Divider */}
        <hr style={{ border: "none", borderTop: "1px solid #e2e8f0", margin: "0 0 24px" }} />

        {/* Next step: Check email */}
        <div
          style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "16px" }}
        >
          {/* Email icon */}
          <div
            style={{
              flexShrink: 0,
              width: "40px",
              height: "40px",
              backgroundColor: "#eff6ff",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <polyline points="2,4 12,13 22,4" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: "15px", fontWeight: "600", color: "#0f172a", margin: "0 0 4px" }}>
              Next step: Check your email
            </p>
            <p style={{ fontSize: "13.5px", color: "#475569", margin: 0, lineHeight: "1.5" }}>
              We've sent you an email with instructions to create your Skyward account and begin
              setup.
            </p>
          </div>
        </div>

        {/* Info box */}
        <div
          style={{
            backgroundColor: "#f8fafc",
            borderRadius: "10px",
            padding: "14px 16px",
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <svg
            style={{ flexShrink: 0, marginTop: "1px" }}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="8" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="12" y1="12" x2="12" y2="16" />
          </svg>
          <p style={{ fontSize: "13.5px", color: "#475569", margin: 0, lineHeight: "1.6" }}>
            The email should arrive within a few minutes.
            <br />
            Please check your spam or promotions folder.
          </p>
        </div>

        {/* Divider */}
        <hr style={{ border: "none", borderTop: "1px solid #e2e8f0", margin: "0 0 20px" }} />

        {/* Support */}
        <div
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5" />
          </svg>
          <p style={{ fontSize: "13.5px", color: "#64748b", margin: 0 }}>
            Need help? Contact us at{" "}
            <a
              href="mailto:hello@skywardos.com"
              style={{ color: "#3b82f6", textDecoration: "none" }}
            >
              hello@skywardos.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
