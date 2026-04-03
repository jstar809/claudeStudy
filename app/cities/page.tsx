import type { Metadata } from "next";
import CityGrid from "@/components/cities/CityGrid";
import { cities } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "도시 탐색",
  description: "대한민국 12개 도시의 노마드 생활 조건(생활비, 인터넷, 카페, 안전도)을 한눈에 비교하세요.",
  openGraph: {
    title: "도시 탐색 | KoreaNomad",
    description: "대한민국 12개 도시의 노마드 생활 조건을 한눈에 비교하세요.",
  },
};

export default function CitiesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">도시 탐색</h1>
        <p className="text-muted-foreground">
          대한민국 {cities.length}개 도시의 노마드 생활 조건을 한눈에 비교하세요.
        </p>
      </div>

      <CityGrid cities={cities} />
    </div>
  );
}
