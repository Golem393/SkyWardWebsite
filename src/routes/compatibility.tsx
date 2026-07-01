import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { usePostHog } from "@posthog/react";
import { Search, X, Check, ArrowLeft, Smartphone, ShieldCheck, AlertCircle } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TITLE = "Compatible Devices — Skyward";
const DESCRIPTION = "Check if your Android phone is compatible with Skyward. We support Samsung, Google Pixel, and Motorola devices running Android 11+.";

export const Route = createFileRoute("/compatibility")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: CompatibilityPage,
});

interface Device {
  name: string;
  series: string;
  brand: "Samsung" | "Google" | "Motorola";
  note?: string;
}

const DEVICES_LIST: Device[] = [
  // Samsung A Series
  { name: "Galaxy A15", series: "Galaxy A15 or newer", brand: "Samsung" },
  { name: "Galaxy A15 5G", series: "Galaxy A15 or newer", brand: "Samsung" },
  { name: "Galaxy A16", series: "Galaxy A15 or newer", brand: "Samsung" },
  { name: "Galaxy A16 5G", series: "Galaxy A15 or newer", brand: "Samsung" },
  { name: "Galaxy A17", series: "Galaxy A15 or newer", brand: "Samsung" },
  { name: "Galaxy A17 5G", series: "Galaxy A15 or newer", brand: "Samsung" },
  { name: "Galaxy A25", series: "Galaxy A15 or newer", brand: "Samsung" },
  { name: "Galaxy A35", series: "Galaxy A15 or newer", brand: "Samsung" },
  { name: "Galaxy A55", series: "Galaxy A15 or newer", brand: "Samsung" },
  { name: "Galaxy A36", series: "Galaxy A15 or newer", brand: "Samsung" },
  { name: "Galaxy A56", series: "Galaxy A15 or newer", brand: "Samsung" },

  // Samsung S Series
  { name: "Galaxy S21", series: "Galaxy S21 or newer", brand: "Samsung" },
  { name: "Galaxy S21+", series: "Galaxy S21 or newer", brand: "Samsung" },
  { name: "Galaxy S21 Ultra", series: "Galaxy S21 or newer", brand: "Samsung" },
  { name: "Galaxy S21 FE", series: "Galaxy S21 or newer", brand: "Samsung" },
  { name: "Galaxy S22", series: "Galaxy S21 or newer", brand: "Samsung" },
  { name: "Galaxy S22+", series: "Galaxy S21 or newer", brand: "Samsung" },
  { name: "Galaxy S22 Ultra", series: "Galaxy S21 or newer", brand: "Samsung" },
  { name: "Galaxy S23", series: "Galaxy S21 or newer", brand: "Samsung" },
  { name: "Galaxy S23+", series: "Galaxy S21 or newer", brand: "Samsung" },
  { name: "Galaxy S23 Ultra", series: "Galaxy S21 or newer", brand: "Samsung" },
  { name: "Galaxy S23 FE", series: "Galaxy S21 or newer", brand: "Samsung" },
  { name: "Galaxy S24", series: "Galaxy S21 or newer", brand: "Samsung" },
  { name: "Galaxy S24+", series: "Galaxy S21 or newer", brand: "Samsung" },
  { name: "Galaxy S24 Ultra", series: "Galaxy S21 or newer", brand: "Samsung" },
  { name: "Galaxy S25", series: "Galaxy S21 or newer", brand: "Samsung" },
  { name: "Galaxy S25+", series: "Galaxy S21 or newer", brand: "Samsung" },
  { name: "Galaxy S25 Ultra", series: "Galaxy S21 or newer", brand: "Samsung" },
  { name: "Galaxy S25 FE", series: "Galaxy S21 or newer", brand: "Samsung" },
  { name: "Galaxy S26", series: "Galaxy S21 or newer", brand: "Samsung" },
  { name: "Galaxy S26+", series: "Galaxy S21 or newer", brand: "Samsung" },
  { name: "Galaxy S26 Ultra", series: "Galaxy S21 or newer", brand: "Samsung" },

  // Google Pixel
  { name: "Pixel 5", series: "Pixel 5 Series", brand: "Google" },
  { name: "Pixel 5a", series: "Pixel 5 Series", brand: "Google" },
  { name: "Pixel 6", series: "Pixel 6 Series", brand: "Google" },
  { name: "Pixel 6 Pro", series: "Pixel 6 Series", brand: "Google" },
  { name: "Pixel 6a", series: "Pixel 6 Series", brand: "Google" },
  { name: "Pixel 7", series: "Pixel 7 Series", brand: "Google" },
  { name: "Pixel 7 Pro", series: "Pixel 7 Series", brand: "Google" },
  { name: "Pixel 7a", series: "Pixel 7 Series", brand: "Google" },
  { name: "Pixel Fold", series: "Pixel 7 Series", brand: "Google" },
  { name: "Pixel 8", series: "Pixel 8 Series", brand: "Google" },
  { name: "Pixel 8 Pro", series: "Pixel 8 Series", brand: "Google" },
  { name: "Pixel 8a", series: "Pixel 8 Series", brand: "Google" },
  { name: "Pixel 9", series: "Pixel 9 Series", brand: "Google" },
  { name: "Pixel 9 Pro", series: "Pixel 9 Series", brand: "Google" },
  { name: "Pixel 9 Pro XL", series: "Pixel 9 Series", brand: "Google" },
  { name: "Pixel 9 Pro Fold", series: "Pixel 9 Series", brand: "Google" },
  { name: "Pixel 9a", series: "Pixel 9 Series", brand: "Google" },
  { name: "Pixel 10", series: "Pixel 10 Series", brand: "Google" },
  { name: "Pixel 10 Pro", series: "Pixel 10 Series", brand: "Google" },
  { name: "Pixel 10 Pro XL", series: "Pixel 10 Series", brand: "Google" },
  { name: "Pixel 10 Pro Fold", series: "Pixel 10 Series", brand: "Google" },
  { name: "Pixel 10a", series: "Pixel 10 Series", brand: "Google" },

  // Motorola
  { name: "Moto G Power (2022)", series: "Moto G Power Series", brand: "Motorola" },
  { name: "Moto G Power 5G (2023)", series: "Moto G Power Series", brand: "Motorola" },
  { name: "Moto G Power 5G (2024)", series: "Moto G Power Series", brand: "Motorola" },
  { name: "Moto G Power 5G (2025)", series: "Moto G Power Series", brand: "Motorola" },
  { name: "Moto G Power (2026)", series: "Moto G Power Series", brand: "Motorola" },
];

function CompatibilityPage() {
  const posthog = usePostHog();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<"All" | "Samsung" | "Google" | "Motorola">("All");

  const handleBrandChange = (brand: "All" | "Samsung" | "Google" | "Motorola") => {
    setSelectedBrand(brand);
    posthog.capture("compatibility_brand_filter_changed", { brand });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim().length > 2) {
      posthog.capture("compatibility_search_performed", { query });
    }
  };

  const filteredDevices = useMemo(() => {
    return DEVICES_LIST.filter((device) => {
      const matchesSearch =
        device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.brand.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBrand = selectedBrand === "All" || device.brand === selectedBrand;
      return matchesSearch && matchesBrand;
    });
  }, [searchQuery, selectedBrand]);

  // Group devices by Brand -> Series for structured layout
  const groupedDevices = useMemo(() => {
    const groups: Record<string, Record<string, Device[]>> = {};

    filteredDevices.forEach((device) => {
      if (!groups[device.brand]) {
        groups[device.brand] = {};
      }
      if (!groups[device.brand][device.series]) {
        groups[device.brand][device.series] = [];
      }
      groups[device.brand][device.series].push(device);
    });

    return groups;
  }, [filteredDevices]);

  return (
    <main className="bg-background text-foreground min-h-screen flex flex-col">
      <Navbar />

      <section className="aurora pt-32 pb-20 px-6 flex-1">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
          </div>

          {/* Heading */}
          <div className="text-center md:text-left mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold -tracking-[0.03em] leading-tight text-balance">
              Compatible Devices
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed text-balance">
              Skyward works by taking device owner privileges via Mobile Device Management (MDM). We support Samsung, Google Pixel, and Motorola devices running Android 11 or higher.
            </p>
          </div>

          {/* Requirement Alert */}
          <div className="mb-10 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 flex items-start gap-4">
            <ShieldCheck className="h-6 w-6 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-1">Android 11+ Requirement</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Regardless of the model, your device must be updated to at least **Android 11** to support Skyward's MDM configuration. Older operating system versions do not support modern system-level lockdown features.
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search phone model (e.g. Galaxy S23, Pixel 9, Moto G...)"
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-12 pr-10 h-12 rounded-2xl bg-card border-border shadow-sm focus-visible:ring-1 focus-visible:ring-primary w-full text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {(["All", "Samsung", "Google", "Motorola"] as const).map((brand) => (
                <button
                  key={brand}
                  onClick={() => handleBrandChange(brand)}
                  className={`rounded-full px-5 py-1.5 text-sm font-medium transition-all ${selectedBrand === brand
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                >
                  {brand === "Google" ? "Google Pixel" : brand === "All" ? "All Brands" : brand}
                </button>
              ))}
            </div>
          </div>

          {/* Results list */}
          {Object.keys(groupedDevices).length > 0 ? (
            <div className="space-y-10">
              {Object.entries(groupedDevices).map(([brand, seriesMap]) => (
                <div key={brand} className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                    <Smartphone className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-bold text-foreground">
                      {brand === "Google" ? "Google Pixel" : brand}
                    </h2>
                  </div>

                  <div className="space-y-8">
                    {Object.entries(seriesMap).map(([series, list]) => (
                      <div key={series}>
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-primary mb-3">
                          {series}
                        </h3>

                        {/* List grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {list.map((device) => (
                            <div
                              key={device.name}
                              className="flex items-center gap-2 p-3 rounded-xl border border-border/50 bg-background/50 hover:bg-muted/30 transition-colors"
                            >
                              <Check className="h-4 w-4 text-primary shrink-0" />
                              <div className="flex flex-col min-w-0">
                                <span className="text-sm font-medium text-foreground truncate">
                                  {device.name}
                                </span>
                                {device.note && (
                                  <span className="text-[10px] text-muted-foreground truncate">
                                    {device.note}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center rounded-3xl border border-border bg-card py-16 px-6">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No matching devices found</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                We couldn't find any results for "{searchQuery}". Skyward generally supports almost all Samsung, Google Pixel, and Motorola devices running Android 11 or higher.
              </p>
              <Button asChild className="rounded-full">
                <a href="mailto:support@skywardos.com?subject=Device compatibility request">
                  Ask Support About My Device
                </a>
              </Button>
            </div>
          )}

          {/* Setup Callout */}
          <div className="mt-12 rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-transparent to-primary/5 p-8 text-center">
            <h3 className="text-xl font-semibold text-balance mb-3">
              Ready to reclaim your focus with Skyward?
            </h3>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6">
              Get started with Skyward today. All subscriptions come with a 30-day money-back guarantee.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="rounded-full shadow-md">
                <Link to="/auth" search={{ mode: "register" }}>
                  Get Started
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
