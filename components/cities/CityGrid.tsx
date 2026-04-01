"use client";

import { useState } from "react";
import CityCard from "./CityCard";
import FilterBar from "./FilterBar";
import type { City } from "@/types";

interface CityGridProps {
  cities: City[];
}

export default function CityGrid({ cities }: CityGridProps) {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-6">
      <FilterBar view={view} onViewChange={setView} />

      <div className="text-sm text-muted-foreground">
        총 <span className="font-semibold text-foreground">{cities.length}개</span> 도시
      </div>

      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            : "flex flex-col gap-4"
        }
      >
        {cities.map((city) => (
          <CityCard key={city.id} city={city} view={view} />
        ))}
      </div>
    </div>
  );
}
