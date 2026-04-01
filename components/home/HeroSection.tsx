import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Search } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/20 py-20 md:py-28">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-accent/30 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge variant="secondary" className="mb-6 text-sm px-4 py-1.5">
          🇰🇷 한국 특화 디지털 노마드 플랫폼
        </Badge>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
          대한민국 어느 도시에서
          <br />
          <span className="text-primary">일하며 살까?</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          실제 노마드가 평가한 47개+ 도시 데이터로<br className="hidden sm:block" />
          나에게 맞는 도시를 5분 안에 찾아보세요.
        </p>

        {/* Search bar */}
        <div className="flex items-center max-w-lg mx-auto bg-background border-2 border-border rounded-xl shadow-lg overflow-hidden mb-8 focus-within:border-primary transition-colors">
          <Search className="w-5 h-5 text-muted-foreground ml-4 shrink-0" />
          <input
            type="text"
            placeholder="도시 이름 검색 (예: 제주, 강릉)"
            className="flex-1 py-3.5 px-3 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground"
          />
          <Button className="m-1.5 shrink-0" render={<Link href="/cities" />}>
            탐색하기
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button size="lg" className="gap-2" render={<Link href="/cities" />}>
            전체 도시 보기 <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="lg" render={<Link href="/community" />}>
            커뮤니티 참여
          </Button>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-6 mt-10 text-sm text-muted-foreground">
          <span>✅ 47개 도시</span>
          <span>✅ 1,200+ 리뷰</span>
          <span>✅ 현재 162명 체류 중</span>
        </div>
      </div>
    </section>
  );
}
