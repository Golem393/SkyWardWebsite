// Builds the Android Device Owner (fully-managed device) provisioning payload
// that gets encoded into the enrollment QR shown after setup.
//
// During the "tap the welcome screen 6 times" flow, the device camera scans
// this QR to download and install the Skyward DPC (device policy controller).
//
// The DPC component / download URL / signature checksum are specific to your
// signed APK — fill them in via env (VITE_DPC_*). The per-user IMEI is passed
// through the admin extras bundle so the device self-identifies on enrollment.

const DPC_COMPONENT = import.meta.env.VITE_DPC_COMPONENT_NAME ?? "";
const DPC_DOWNLOAD_URL = import.meta.env.VITE_DPC_DOWNLOAD_URL ?? "";
const DPC_SIGNATURE_CHECKSUM = import.meta.env.VITE_DPC_SIGNATURE_CHECKSUM ?? "";

export function buildEnrollmentPayload(imei: string): string {
  const payload = {
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME": DPC_COMPONENT,
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION": DPC_DOWNLOAD_URL,
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM": DPC_SIGNATURE_CHECKSUM,
    "android.app.extra.PROVISIONING_SKIP_ENCRYPTION": false,
    "android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED": true,
    "android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": {
      "com.skyward.IMEI": imei,
    },
  };

  return JSON.stringify(payload);
}

/** Whether the DPC constants are configured enough to render a usable QR. */
export const isEnrollmentConfigured = Boolean(DPC_COMPONENT && DPC_DOWNLOAD_URL);
