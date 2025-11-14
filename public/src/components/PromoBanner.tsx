import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { X } from "lucide-react";
import { useState } from "react";
import type { Settings } from "../../../shared/schema";

export function PromoBanner() {
  const [isDismissed, setIsDismissed] = useState(false);
  
  const { data: settings = [] } = useQuery<Settings[]>({
    queryKey: ["/api/settings"],
  });

  const getSetting = (key: string) => {
    return settings.find((s: Settings) => s.key === key)?.value || "";
  };

  const bannerShow = getSetting("bannerShow") === "true";
  const bannerText = getSetting("bannerText");
  const bannerLink = getSetting("bannerLink");

  if (!bannerShow || isDismissed || !bannerText) {
    return null;
  }

  return (
    <div className="bg-primary text-primary-foreground py-3 px-4 flex items-center justify-between" data-testid="banner-promo">
      <div className="flex-1 text-center">
        {bannerLink ? (
          <Link href={bannerLink} className="hover:underline font-medium" data-testid="link-banner">
            {bannerText}
          </Link>
        ) : (
          <span className="font-medium">{bannerText}</span>
        )}
      </div>
      <button
        onClick={() => setIsDismissed(true)}
        className="hover-elevate p-1 rounded"
        aria-label="Zamknij banner"
        data-testid="button-dismiss-banner"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
