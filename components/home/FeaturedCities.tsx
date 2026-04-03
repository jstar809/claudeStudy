import Link from "next/link";
import { Button } from "@/components/ui/button";
import CityCard from "@/components/cities/CityCard";
import { cities } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";

export default function FeaturedCities() {
  const featured = [...cities].sort((a, b) => a.rank - b.rank).slice(0, 6);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">🔥 이달의 인기 도시</h2>
            <p className="text-muted-foreground">노마드들이 가장 많이 선택한 도시 TOP 6</p>
          </div>
          <Button variant="outline" className="hidden sm:flex gap-1" render={<Link href="/cities" />}>
            전체 보기 <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Button variant="outline" className="gap-1" render={<Link href="/cities" />}>
            전체 도시 보기 <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
