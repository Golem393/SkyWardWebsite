import { useState } from "react";

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  // Users can set VITE_WHATSAPP_NUMBER in their .env, e.g. VITE_WHATSAPP_NUMBER=+1234567890
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "+16613476214";
  const defaultMessage = encodeURIComponent("Hi! I have a question about Skyward.");

  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9+]/g, "")}?text=${defaultMessage}`;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 pointer-events-auto"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      <div
        className={[
          "hidden md:block bg-background/95 backdrop-blur border border-border text-foreground px-4 py-2 rounded-2xl text-sm font-medium shadow-lg transition-all duration-300 transform",
          showTooltip ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none",
        ].join(" ")}
      >
        Chat with us on WhatsApp
      </div>

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full text-white bg-gradient-to-tr from-[#128C7E] to-[#25D366] shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_35px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 group"
      >
        {/* Custom WhatsApp SVG Icon */}
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 fill-current transition-transform duration-300 group-hover:rotate-12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.498 1.45 5.419 1.451 5.428 0 9.845-4.385 9.848-9.774.001-2.611-1.015-5.066-2.86-6.92C17.209 2.058 14.76 1.014 12.01 1.014c-5.433 0-9.85 4.387-9.853 9.776-.001 1.914.502 3.791 1.46 5.392l-.95 3.473 3.58-.928zm11.368-6.192c-.3-.149-1.774-.868-2.047-.967-.272-.099-.47-.149-.667.149-.197.297-.765.967-.937 1.164-.173.199-.347.223-.647.074-.3-.149-1.265-.462-2.41-1.474-.89-.789-1.49-1.764-1.665-2.062-.173-.297-.018-.458.13-.606.134-.133.3-.347.45-.52.149-.174.199-.297.298-.497.099-.198.05-.371-.025-.52-.075-.149-.667-1.597-.913-2.192-.24-.576-.48-.497-.667-.506-.172-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.173 5.076 4.447.709.303 1.263.484 1.693.621.71.223 1.358.19 1.87.114.571-.085 1.774-.719 2.022-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
        </svg>
      </a>
    </div>
  );
}
