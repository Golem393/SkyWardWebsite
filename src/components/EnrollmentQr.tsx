import { QRCodeSVG } from "qrcode.react";
import { buildEnrollmentPayload, isEnrollmentConfigured } from "@/lib/enrollment";

/**
 * Renders the per-user Android enrollment QR. Falls back to a clear message
 * when the device hasn't been linked yet or the DPC env isn't configured.
 */
export function EnrollmentQr({ imei }: { imei: string | null | undefined }) {
  if (!imei) {
    return (
      <p className="text-sm text-muted-foreground">
        Link your device IMEI to generate your enrollment QR.
      </p>
    );
  }

  if (!isEnrollmentConfigured) {
    return (
      <p className="text-sm text-muted-foreground">
        Enrollment QR isn't configured yet. Set the <code>VITE_DPC_*</code> env values to enable it.
      </p>
    );
  }

  return (
    <div className="inline-flex flex-col items-center gap-2">
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <QRCodeSVG value={buildEnrollmentPayload(imei)} size={208} level="M" />
      </div>
      <span className="text-xs text-muted-foreground">Scan during device setup</span>
    </div>
  );
}
