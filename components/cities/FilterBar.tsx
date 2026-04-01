"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutGrid, List, ChevronDown, X, SlidersHorizontal } from "lucide-react";

const sortOptions = [
  { value: "nomad", label: "⭐ 종합 노마드 점수" },
  { value: "cost", label: "💵 생활비 낮은순" },
  { value: "internet", label: "📡 인터넷 빠른순" },
  { value: "cafe", label: "☕ 카페/코워킹 많은순" },
  { value: "climate", label: "🌤 기후 좋은순" },
  { value: "reviews", label: "💬 리뷰 많은순" },
  { value: "hot", label: "🔥 이번달 핫한순" },
];

const regions = ["수도권", "강원", "경상", "전라", "제주", "충청"];
const features = ["바다", "산·숲", "도심", "한적함", "카페많음"];
const costs = ["~50만", "50~100만", "100~150만", "150만+"];

interface FilterBarProps {
  view: "grid" | "list";
  onViewChange: (v: "grid" | "list") => void;
}

export default function FilterBar({ view, onViewChange }: FilterBarProps) {
  const [selectedSort, setSelectedSort] = useState("nomad");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedCost, setSelectedCost] = useState<string | null>(null);
  const [fastInternet, setFastInternet] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const currentSort = sortOptions.find((o) => o.value === selectedSort);

  const activeFilters = [
    ...selectedRegions,
    ...selectedFeatures,
    ...(selectedCost ? [selectedCost] : []),
    ...(fastInternet ? ["100Mbps+"] : []),
  ];

  function toggleRegion(region: string) {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  }

  function toggleFeature(feature: string) {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  }

  function clearAll() {
    setSelectedRegions([]);
    setSelectedFeatures([]);
    setSelectedCost(null);
    setFastInternet(false);
  }

  return (
    <div className="space-y-3">
      {/* Top row: sort + view toggle + filter toggle */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" size="sm" className="gap-1.5">
                {currentSort?.label}
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52">
              {sortOptions.map((opt) => (
                <DropdownMenuItem
                  key={opt.value}
                  onClick={() => setSelectedSort(opt.value)}
                  className={selectedSort === opt.value ? "bg-accent" : ""}
                >
                  {opt.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => setShowFilters((v) => !v)}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            필터
            {activeFilters.length > 0 && (
              <Badge className="h-4 w-4 p-0 text-xs flex items-center justify-center rounded-full">
                {activeFilters.length}
              </Badge>
            )}
          </Button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center border rounded-md overflow-hidden">
          <Button
            variant={view === "grid" ? "default" : "ghost"}
            size="sm"
            className="rounded-none border-0 h-8 px-3"
            onClick={() => onViewChange("grid")}
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button
            variant={view === "list" ? "default" : "ghost"}
            size="sm"
            className="rounded-none border-0 h-8 px-3"
            onClick={() => onViewChange("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Expandable filter panel */}
      {showFilters && (
        <div className="bg-muted/30 border rounded-lg p-4 space-y-4">
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">지역</p>
            <div className="flex flex-wrap gap-2">
              {regions.map((r) => (
                <Button
                  key={r}
                  variant={selectedRegions.includes(r) ? "default" : "outline"}
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => toggleRegion(r)}
                >
                  {r}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">특성</p>
            <div className="flex flex-wrap gap-2">
              {features.map((f) => (
                <Button
                  key={f}
                  variant={selectedFeatures.includes(f) ? "default" : "outline"}
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => toggleFeature(f)}
                >
                  {f}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">월 생활비</p>
            <div className="flex flex-wrap gap-2">
              {costs.map((c) => (
                <Button
                  key={c}
                  variant={selectedCost === c ? "default" : "outline"}
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setSelectedCost((prev) => (prev === c ? null : c))}
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={fastInternet ? "default" : "outline"}
              size="sm"
              className="h-7 text-xs"
              onClick={() => setFastInternet((v) => !v)}
            >
              📡 100Mbps 이상만
            </Button>
          </div>
        </div>
      )}

      {/* Active filter tags */}
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground">적용된 필터:</span>
          {activeFilters.map((f) => (
            <Badge key={f} variant="secondary" className="gap-1 text-xs">
              {f}
              <button
                onClick={() => {
                  if (selectedRegions.includes(f)) toggleRegion(f);
                  else if (selectedFeatures.includes(f)) toggleFeature(f);
                  else if (f === selectedCost) setSelectedCost(null);
                  else if (f === "100Mbps+") setFastInternet(false);
                }}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" className="h-6 text-xs text-muted-foreground" onClick={clearAll}>
            전체 초기화
          </Button>
        </div>
      )}
    </div>
  );
}
