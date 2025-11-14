import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { X } from "lucide-react";
import { useState } from "react";
import type { Settings } from "../../../shared/schema";

export function PromoBanner() {
  return (
    <div className="bg-primary text-black border-b border-primary-foreground/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-2 text-xs md:text-sm font-medium">
          <div className="flex items-center gap-4 md:gap-6 flex-wrap">
            <span className="flex items-center gap-1">
              ✓ Darmowa dostawa od 99 zł
            </span>
            <span className="hidden sm:flex items-center gap-1">
              ✓ Odbiór za godzinę
            </span>
            <span className="hidden md:flex items-center gap-1">
              ✓ Raty 0% i leasing
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/kontakt" className="hover:underline">
              Znajdź sklep
            </a>
            <a href="/kontakt" className="hover:underline hidden sm:inline">
              Pomoc i kontakt
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}